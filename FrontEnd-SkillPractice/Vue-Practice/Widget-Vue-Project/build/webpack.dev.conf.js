'use strict'
// 工具函数方法
const utils = require('./utils')
const webpack = require('webpack')
// 引入../config/index.js
const config = require('../config')
// 合并配置文件，用来和webpack.base.config.js合并
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
// 复制Webpack插件，将单个文件或整个目录复制到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 html 并且注入到 .html 文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack错误信息提示插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 一个简单的工具，查找当前机器上的开放端口
const portfinder = require('portfinder')

// 设置开发环境的的ip地址和端口
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// dev的设置，将webpack-base.config和下面的合并
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 对独立的css或者less，scss文件进行编译
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // dev环境使用cheap-module-eval-source-map代码调试用
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // 使用webpack-dev-server    相关配置在 ../config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [ {from: /. */, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')}
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    // config.dev.env展示的是"development"，我们可以根据这个字段做一些操作,例如dev环境资源的配置 
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 使用热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 启用此插件后，编译时发生错误，webpack进程将不会退出并显示错误代码
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // html插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    // 将单个文件或整个目录复制到构建目录
    new CopyWebpackPlugin([ {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }
    ])
  ]
})

//将dev环境的config输出
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    }else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here:http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
