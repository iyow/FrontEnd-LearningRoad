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
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}