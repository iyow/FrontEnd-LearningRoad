const fs = require('fs')
// const webpack = require('webpack')
// const loaderUtils = require('loader-utils');
// const validateOptions =  require('schema-utils');

module.exports = function (source, map) {
    // var callback = this.async()
    // 获取到用户给当前 Loader 传入的 options
    // const options = webpack.loaderUtils.getOptions(this);
    console.log('------------这是loader')
    console.log(this.options)
    console.log(source)
    let result = String(source.replace('[name]', '你好我塞不到打撒所大所多'))
    console.log(result)
    console.log('------------这是loader')
    // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
    // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
    // loader 可以被链式调用意味着不一定要输出 JavaScript。
    // 只要下一个 loader 可以处理这个输出，这个 loader 就可以返回任意类型的模块。
    this.callback(null, `'${result}'`, map);
    return ;
    // 注意不能直接返回标签  需要用引号包一层作为字符串
    // return `module.exports = '${result}' `
}

// 那么loader里到底应该写点什么才能完成代码转换呢？这就涉及到了——编译器(Compiler) 的概念。
// 一个基本的编译器，需要经过tokenize,parse,transform,stringify几个核心步骤，
// 它的应用是非常广，SPA中的virtual-DOM的解析，babel中的ES6语法解析等等，