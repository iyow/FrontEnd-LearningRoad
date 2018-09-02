'use strict'
const path = require('path')
// 工具函数集合
const utils = require('./utils')
// 引用配置文件，config文件夹下的index.js
const config = require('../config')
// vue-loader配置文件
const vueLoaderConfig = require('./vue-loader.conf')

//该函数将目录回退到该文件绝对路径的上一级，也就是根目录
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
     // 编译输出的静态资源根路径，可以在config文件夹下的index.js下build函数中看到，会生成dist文件夹
    path: config.build.assetsRoot,
    // 编译输出的文件名
    filename: '[name].js',
     // 正式发布环境下编译输出的上线路径的根路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //关于我们在代码中require或者import文件的相关配置
  resolve: {
    //可以省略后缀的文件（可以自动补全后缀名）
    extensions: ['.js', '.vue', '.json'],
    //提供一些别名，例如在router.js中使用
    // import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // 处理 .vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // babel编译 js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      // 处理图片文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 处理视频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 处理字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
