// Webpack配置是标准的 Node.js CommonJS模块，
// 它通过require来引入其他模块，通过module.exports导出模块，
// 由Webpack根据对象定义属性进行解析。
const webpack = require('webpack');
const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist/'); // 声明/dist的路径

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
// 用于在构建之前删除或清除构建文件夹
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 4.0版本启用的插件，替代原extract-text-webpack-plugin插件，将处理后的CSS代码提取为独立的CSS文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 入口JS路径,可以为String，Array，Object   实现多页面配置
    // 指示Webpack应该使用哪个模块，来作为构建其内部依赖图的开始
    entry: {
        index: path.resolve(__dirname, '../src/pages/index-page/index.tsx')
    },

    // 编译输出的JS入路径 
    // 告诉Webpack在哪里输出它所创建的bundle，以及如何命名这些文件,
    // [name]与入口文件名对应 默认为main,[hash:7]文件指纹(MD5)取七位
    output: {
        path: DIST_PATH, // 创建的bundle生成到哪里
        filename: '[name].[hash:7].bundle.js', // 创建的bundle的名称, [contentHash]
        sourceMapFilename: '[name].js.map' // 创建的SourceMap的文件名
    },
    // Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。
    //  Webpack 内置 JavaScript 模块化语法解析功能，
    // 默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。
    resolve: {
        // 配置之后可以不用在require或是import的时候加文件扩展名，会依次尝试添加扩展名进行匹配
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
        modules: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../node_modules'),
        ],
        // 路径别名解析,使用typescript还需要在tsconfig中配置
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, './src/common-components'),
            '@pages': path.resolve(__dirname, '../src/pages'),
            '@images': path.resolve(__dirname, '../src/assets/images'),
            '@fonts': path.resolve(__dirname, '../src/assets/fonts'),
            '@icons': path.resolve(__dirname, '../src/assets/icons'),
        },
    },
    // 模块解析
    module: {
        rules: [
            // 处理js jsx tsx  的 loader
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/, // 排除不处理的目录
                include: path.resolve(__dirname, '../src'), // 精确指定要处理的目录
                // 最后的 loader 最早调用，将会传入原始资源内容。
                // 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map（可选）。
                // 中间的 loader 执行时，会传入前一个 loader 传出的结果。
                use: [{
                        // 两种用法,查询字符串:babel-loader?cacheDirectory,
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: "awesome-typescript-loader"
                    },
                    {
                        loader: "eslint-loader",
                        // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
                        options: {
                            // 指定错误报告的格式规范
                            // formatter默认是stylish
                            // 如果想用第三方的需要安装三方分享的插件 例如eslint-friendly-formatter
                            formatter: require('eslint/lib/cli-engine/formatters/stylish')
                        },
                    }
                ]
            },
            // 处理css的 loader
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                use: [{
                        loader: process.env.NODE_ENV !== 'dev' ? MiniCssExtractPlugin.loader : ['css-hot-loader', 'style-loader'],
                        options: {
                            "sourceMap": true
                        }
                    },
                    {
                        loader: "css-modules-typescript-loader",
                        options: {
                            namedExport: true,
                            camelCase: true,
                            sass: true,
                            modules: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                            // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            importLoaders: 1,
                            "sourceMap": true,
                            // 使用CSS Modules功能
                            modules: {
                                // 文件名__原始类名__hash
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            "sourceMap": true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            "sourceMap": true
                        }
                    }
                ]

            },

            // images loader
            {
                test: /\.(png|jp(e*g)|gif|svg|webp)(\?.*)?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024, // 小于10kb的图片编译成base64编码，大于的单独打包成图片 
                        name: "images/[hash]-[name].[ext]", // Placeholder占位符
                        publicPath: "assets", // 最终生成的CSS代码中，图片URL前缀
                        outputPath: "assets", // 图片输出的实际路径（相对于/dist目录）
                    }
                }]
            },
            // font loader
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024, // 小于10kb的字体编译成base64编码
                        name: "fonts/[hash]-[name].[ext]", // Placeholder占位符
                        publicPath: "assets", // 最终生成的CSS代码中，字体URL前缀
                        outputPath: "assets", // 字体输出的实际路径（相对于/dist目录）
                    }
                }]
            }
        ]
    },

    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        // 对于浏览器而言，html文件是用户访问的入口点，也是所有资源的挂载点，所有资源都是通过html中的标记来进行引用的。
        // 而在webpack的构建世界里，html只是一个展示板，
        // 而entry参数中指定的javascript入口文件才是真正在构建过程中管理和调度资源的挂载点，
        // html文件中最终展示的内容，都是webpack在加工并为所有资源打好标记以后传递给它(html)的(模板引擎)，
        // 业界将这种有别与浏览器的模式称之为“webpack的逆向注入”。
        new HtmlWebpackPlugin({
            title: 'webpack-react-app',
            inject: false,
            template: HtmlWebpackTemplate,
            // 自定义模板
            // template: ‘index.html',
            // templateParameters: {
            //     params1: 'shall we',
            //     params2: 'we will'
            // },
            // minify: {
            //     removeComments: true, // 移除注释
            //     collapseWhitespace: true, // 压缩空白文本节点
            //     collapseInlineTagWhitespace: true // 压缩行级元素空白 ， 保留&nbsp;和实体空格
            // },
            appMountId: 'react-approot',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name]-[id].[contenthash].chunk.css',
        })
    ]
}