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
        host: '0.0.0.0',            // host地址  解析详情且看下方注释
        port: 8090,                 // 服务器端口
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


// 0.0.0.0
// IPV4中，0.0.0.0地址被用于表示一个无效的，未知的或者不可用的目标。 
// * 在服务器中，0.0.0.0指的是本机上的所有IPV4地址，如果一个主机有两个IP地址，192.168.1.1 和 10.1.2.1，并且该主机上的一个服务监听的地址是0.0.0.0,那么通过两个ip地址都能够访问该服务。 
// * 在路由中，0.0.0.0表示的是默认路由，即当路由表中没有找到完全匹配的路由的时候所对应的路由。

// 用途总结：

// 当一台主机还没有被分配一个IP地址的时候，用于表示主机本身。（DHCP分配IP地址的时候）
// 用作默认路由，表示”任意IPV4主机”。
// 用来表示目标机器不可用。
// 用作服务端，表示本机上的任意IPV4地址。

// 127.0.0.1
// 127.0.0.1属于{127,}集合中的一个，而所有网络号为127的地址都被称之为回环地址，所以回环地址！=127.0.0.1,它们是包含关系，即回环地址包含127.0.0.1。 
// 回环地址：所有发往该类地址的数据包都应该被loop back。 
// 用途: 
// * 回环测试,通过使用ping 127.0.0.1 测试某台机器上的网络设备，操作系统或者TCP/IP实现是否工作正常。 
// * DDos攻击防御：网站收到DDos攻击之后，将域名A记录到127.0.0.1，即让攻击者自己攻击自己。 
// * 大部分Web容器测试的时候绑定的本机地址。

// localhost
// 相比127.0.0.1，localhost具有更多的意义。localhost是个域名，而不是一个ip地址。
// 之所以我们经常把localhost与127.0.0.1认为是同一个
// 是因为我们使用的大多数电脑上都将localhost指向了127.0.0.1这个地址（DNS解析）。 