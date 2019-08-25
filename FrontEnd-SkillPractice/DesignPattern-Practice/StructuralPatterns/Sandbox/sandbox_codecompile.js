// 使用沙箱模式，通过把所有代码逻辑包裹在一个回调函数中，
// 你根据所需模块的不同生成不同的实例，而这些实例彼此互不干扰独立的工作着，从而保护了全局命名空间。

// 使用沙箱  实现  代码的编译

// 一，直接嵌套
function compileCode(src) {
    // eval 的特性是如果当前域里面没有,则会向上遍历.一直到最顶层的global scope 比如window.
    // 使用new Function(..args,bodyStr) 来代替eval。
    src = 'with (sandbox) {' + src + '}'
    const code = new Function('sandbox', src)
    // 检查 获取的变量是否在里面 like: 'in'
    function has(target, key) {
        return true
    }

    // 有些方法是不会被with scope 影响的. 通过Symbol.unscopables 这个特性来检测
    function get(target, key) {
        if (key === Symbol.unscopables) return undefined
        return target[key]
    }

    return (function () {
        var _sandbox, sandboxProxy;
        return function (sandbox) {
            if (sandbox !== _sandbox) {
                _sandbox = sandbox;
                sandboxProxy = new Proxy(sandbox, { has, get })
            }
            return code(sandboxProxy)
        }
    })()
}

const sandboxProxies = new WeakMap()
function compileCode(src) {
    src = 'with (sandbox) {' + src + '}'
    const code = new Function('sandbox', src)

    function has(target, key) {
        return true
    }

    function get(target, key) {
        if (key === Symbol.unscopables) return undefined
        return target[key]
    }
    return function (sandbox) {
        if (!sandboxProxies.has(sandbox)) {
            const sandboxProxy = new Proxy(sandbox, { has, get })
            sandboxProxies.set(sandbox, sandboxProxy)
        }
        return code(sandboxProxies.get(sandbox))
    }
}

// 二，iframe(sandbox属性) + postMessage + eval