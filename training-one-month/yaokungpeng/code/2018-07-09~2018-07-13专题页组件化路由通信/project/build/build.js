'use strict'
//调用检测版本的文件，因为使用node和npm版本需要求的，因为check-versions.js是exports出一个函数，所以可以直接调用运行
require('./check-versions')()

//全局环境变量的设置  因为bundle.js是打的生产包,所以参数是production
process.env.NODE_ENV = 'production'

// loading 插件，可以在npm run build时看到loading
const ora = require('ora')
//删除命令，每次打包前会将上次打包的文件删除
const rm = require('rimraf')
//node.js中自带的文件路径工具
const path = require('path')
//在命令行中输出带颜色的文字
const chalk = require('chalk')
const webpack = require('webpack')
//引入../config/index.js，也就是项目中的一些配置变量，只引入文件夹，是因为会自动去该文件夹下找index.js
const config = require('../config')
//引入生产包的配置
const webpackConfig = require('./webpack.prod.conf')
//日志输出插件，会在命令行中显示loading效果，并输出提示
const spinner = ora('building for production...')
spinner.start()

// 删除上次编译生成过的文件（递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  //在删除完成的回调函数中开始编译    因为基本的webpack是有‘webpack’这个命令的，
  //会自动去找根目录下的webpck.config.js,而我们不是用的webpck.config.js
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // 在编译完成的回调函数中,在终端输出编译的文件
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
