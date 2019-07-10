const path = require('path');

const MyWebpackPlugin = require('./MyWebpackPlugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './main.js')
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js',
    },
    plugins: [
        new MyWebpackPlugin({
            params1: 'hello',
            params2: 'plugin'
        })
    ]
}