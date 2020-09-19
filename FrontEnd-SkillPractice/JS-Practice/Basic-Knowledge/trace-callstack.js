/**
 * @description js 浏览器内 打印 获取调用栈日志方法
 * 
 */

//  非严格模式下可用 只能显示 调用栈函数名
console.traceJustFuncName = function () {
    var stack = [],
        caller = arguments.callee.caller;
    while (caller) {
        if (typeof caller == 'function' || typeof caller == 'object') {
            var name = ('' + caller).match(/function\s*([\w\$]*)\s*\(/);
        }
        stack.unshift(name && name[1]);
        caller = caller && caller.caller;
    }
    console.info('functions on stack:' + '\n' + stack.join('\n'));
}
// 直接向控制台输出 调用栈信息,只能在控制台输出无法在代码中获取到信息
console.trace

// 通过抛出错误并捕获 获取调用栈详细信息并记录
console.traceTrowErrorAndCatch = function () {
    try {
        throw new Error('show call stack')
    } catch (err) {
        console.info(err)
        let s = err.stack.split('\n').slice(0, 4)
        // chrome80，err.stack 字符串以  Error 开头 将会解析文件路径，Firefox不会被影响
        // at tryCatch (webpack-internal:///./node_modules/regenerator-runtime/runtime.js:62:40) 解析为
        // at tryCatch (runtime.js?4a57:62)
        err.stack = s.join('\n')
        console.info(err)
    }
}