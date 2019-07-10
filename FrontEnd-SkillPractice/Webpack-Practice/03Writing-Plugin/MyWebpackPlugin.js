// hooks https://webpack.js.org/api/compiler-hooks/#compile

// A JavaScript class.
//  一个 JavaScript 命名函数。
class MyWebpackPlugin {
    // 在插件函数的 prototype 上定义一个 `apply` 方法。
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {

        compiler.hooks.compile.tap('MyWebpackPlugin',
            (compilation, callback) => {
                console.log('process----------------compile-----------plugin!');
                // callback();
            }
        )
        // 指定一个挂载到 webpack 自身的事件钩子。
        // Specify the event hook to attach to
        compiler.hooks.emit.tapAsync(
            'MyWebpackPlugin',
            // compilation----/* 处理 webpack 内部实例的特定数据。*/
            (compilation, callback) => {
                console.log('process--------emit----------plugin!');
                console.log('This is an example plugin!');
                console.log('Here’s the `compilation` object which represents a single build of assets:');

                // Manipulate the build using the plugin API provided by webpack
                // compilation.addModule( /* ... */ );

                // 功能完成后调用 webpack 提供的回调。
                callback();
            }
        );

        // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
        compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
            console.log('process--------emit----------plugin!');

            // Create a header string for the generated file:
            var filelist = 'In this build:\n\n';

            // Loop through all compiled assets,
            // adding a new line item for each filename.
            for (var filename in compilation.assets) {
                filelist += '- ' + filename + '\n';
            }

            // Insert this list into the webpack build as a new file asset:
            compilation.assets['filelist.md'] = {
                source: function () {
                    return filelist;
                },
                size: function () {
                    return filelist.length;
                }
            };

            callback();
        });

    }
}

// //  一个 JavaScript 命名函数。
// function MyWebpackPlugin() {}
// // 在插件函数的 prototype 上定义一个 `apply` 方法。
// MyWebpackPlugin.prototype.apply = function (compiler) {
// }



module.exports = MyWebpackPlugin