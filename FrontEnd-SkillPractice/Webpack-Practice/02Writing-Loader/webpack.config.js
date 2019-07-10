const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './main.js')
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /.*\.tpl\.html$/,
            use: [{
                // 如果为配置resolveLoader
                // loader:path.resolve('path/to/loader.js')
                loader: 'tpl-next-chain-loader'
            },
            {
                loader: 'tpl-loader',
                options: {
                    params1: 'one p',
                    params2: 'two p'
                }
            }
            ]
        }]
    },
    // Npm link 专门用于开发和调试本地 Npm 模块，能做到在不发布模块的情况下，
    // 把本地的一个正在开发的模块的源码链接到项目的 node_modules 目录下，
    // 让 项目可以直接使用本地的 Npm 模块。 
    // 由于是通过软链接的方式实现的，编辑了本地的 Npm 模块代码，在项目中也能使用到编辑后的代码。
    // 完成 Npm link 的步骤如下：
    // 确保正在开发的本地 Npm 模块（也就是正在开发的 Loader）的 package.json 已经正确配置好；
    // 在本地 Npm 模块根目录下执行 npm link ，把本地模块注册到全局；
    // 在项目根目录下执行 npm link loader-name ，把第2步注册到全局的本地 Npm 模块链接到项目的 node_moduels 下，
    // 其中的 loader-name 是指 在第1步中的 package.json 文件中配置的模块名称。
    // 链接好 Loader 到项目后你就可以像使用一个真正的 Npm 模块一样使用本地的 Loader 了。

    // 不使用npm link方式  webpack提供了模块解析配置如下
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}