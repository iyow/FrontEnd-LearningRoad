function add(a, b) {
    return a + b
}

// 缓存计算值
function memoize(fundamental, cache = {}) {
    let shell = (...arg) => {
        !cache.hasOwnProperty(arg) && (cache[arg] = fundamental(...arg))
        // 应该通过 函数的 参数 算出唯一key作为键
        return cache[arg]
    }
    return shell
}


// 每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
function proxyMemoize(fundamental, cache = {}) {
    return new Proxy(fundamental, {
        apply(target, ctx, args) {
            !cache.hasOwnProperty(args) && (cache[args] = Reflect.apply(target,ctx,args))
            return cache[args]
        }
    })
}

let memoizeAdd = memoize(add)
let proxyAdd = proxyMemoize(add)

// console.time('1')
// let a = memoizeAdd(1, 2)
// console.timeEnd('1')

// console.time('2')
// memoizeAdd(1, 2)
// console.timeEnd('2')

// console.time('3')
// let b = proxyAdd(1, 2)
// console.log(typeof add
console.log(proxyAdd(3, 4))
console.log(proxyAdd(3, 4))
console.log(proxyAdd(213, 123))
// console.log(proxyMemoize(add))
// console.log(b)
// console.timeEnd('3')