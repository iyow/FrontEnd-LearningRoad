// 代理和本体接口的一致性
// 如果有一天我们不再需要预加载，那么就不再需要代理对象，可以选择直接请求本体。
// 代理对象和本体是一致的， 代理接手请求的过程对于用户来说是透明的

// 用户可以放心地请求代理，他只关心是否能得到想要的结果。
// 在任何使用本体的地方都可以替换成使用代理。

const mult = function (...params) {
    console.log('开始计算乘积');
    var a = 1;
    for (var i = 0, l = params.length; i < l; i++) {
        a = a * params[i];
    }
    return a;
}

const proxyMult = (function () {
    let cache = {}
    return function (...params) {
        let p = params.join('')
        if (!(p in cache)) {
            cache[p] = mult(...params)
        }
        return cache[p]
    }
})()

// 缓存代理工厂 参数不能为对象(想法，是否可以使用hashcode作为cache的key，hashcode重复的可能性有多高)
const creatCacaheFactory = function (fn) {
    let cache = {}
    return function (...params) {
        let p = params.join('')
        if (!(p in cache)) {
            cache[p] = fn(...params)
        }
        return cache[p]
    }
}

console.time('t')
proxyMult(7, 9, 8)
console.timeEnd('t')
console.time('t1')
proxyMult(7, 9, 8)
console.timeEnd('t1')
console.log('==================')
let getMultProxy = creatCacaheFactory(mult)
console.time('t2')
getMultProxy(9, 10, 11)
console.timeEnd('t2')
console.time('t3')
getMultProxy(9, 10, 11)
console.timeEnd('t3')
console.log('==================')
mult(7, 9, 8)
mult(7, 9, 8)