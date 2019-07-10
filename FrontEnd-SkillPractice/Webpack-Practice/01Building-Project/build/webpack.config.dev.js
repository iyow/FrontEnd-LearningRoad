const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.config.common.js');

const DIST_PATH = path.resolve(__dirname, '../dist/');  // 声明/dist的路径

module.exports = merge(commonConfig, {
    mode: 'development', // 设置webpack mode的模式
    devtool: 'cheap-module-eval-source-map', // 此选项控制是否生成，以及如何生成 source map，具体查看webpack文档

    output: {
        filename: 'js/[name].bundle.js', // 创建的bundle的名称
        chunkFilename: 'js/[name].bundle.js',
        sourceMapFilename: 'js/[name].bundle.js.map', // 创建的SourceMap的文件名
        publicPath: '/', // 指定存放静态资源的CDN地址
    },
    // 开发环境下需要的相关插件配置
    plugins: [
        new webpack.NamedModulesPlugin(), // 用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // 开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新
    ],

    // 开发服务器
    devServer: {
        hot: true,                  // 热更新，无需手动刷新
        contentBase: DIST_PATH,     // 
        host: '0.0.0.0',            // host地址
        port: 8090,                 // 服务器端口 localhost----DNS解析本地回环----0.0.0.0
        historyApiFallback: true,   // 该选项的作用所用404都连接到index.html
        overlay: {
            // 当出现编译错误或警告时，就在页面上显示一层黑色的背景层和错误信息
            errors: true,
        },
        compress: true, // 开启压缩
        // 默认情况下，应用程序启用内联模式(inline mode) 。
        // 这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
        // 也可以使用 iframe 模式，它在通知栏下面使用<iframe> 标签，包含了关于构建的消息。切换到 iframe 模式
        inline: true,
        proxy: {
            "/api": "http://localhost:3000" // 代理到后端的服务地址，会拦截所有以api开头的请求地址
        }
    }
})