let runStart = function () {
    console.log('runStart')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('🏃开始')
        }, 100);
    })
}
let runRight = function () {
    console.log('runRight')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('向右匀速运动')
        }, 100);
    })
}
let runStop = function () {
    console.log('runStop')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('休息一下')
        }, 100);
    })
}
let runLeft = function () {
    console.log('runLeft')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('向左匀速运动')
        }, 100);
    })
}
let runEnd = function () {
    console.log('runEnd')

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('🏃结束')
        }, 100);
    })
}

function* generator() {
    let rs = ''
    rs = yield runStart()
    console.log('================', rs)
    rs = yield runRight()
    console.log('================', rs)
    rs = yield runStop()
    console.log('================', rs)
    rs = yield runLeft()
    console.log('================', rs)
    rs = yield runEnd()
    console.log('================', rs)
}
let a = generator()
let i = 0
while (i < 10) {
    let res = a.next(i)
    console.log('==x==x=x=x=x', res)
    if (res.done) {
        a = generator()
    }
    i++
}

// generator函数暂停执行 + 自执行函数 实现多个异步方法的同步化调用
// generator里的异步操作都返回一个thunk函数
// 解析Start----------------------------------

function readSome(a, b, callback) {
    // 异步执行完成---执行callbal
    // run函数中 next会作为参数传入，在异步执行完成后继续执行next实现自执行
    // callback的参数，即next函数参数，即yield的返回值在此传递
    setTimeout(function () {
        callback && callback(a + b)
    }, 1000)
}
let thunkFunc = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback)
        }
    }
}
let thunk_rs = thunkFunc(readSome)
// thunk_rs('hello     ', 'thunk_rs')((res) => { console.log(res) })

let myGenFunc = function* () {
    let r1 = yield thunk_rs('hello   ', 'result 111')
    console.log('=======嘿嘿嘿😜', r1)
    let r2 = yield thunk_rs('hello   ', 'result 222')
    console.log('=======嘿嘿嘿😜', r2)
    return r1 + r2
}

function run(genFn) {
    let fnIterator = genFn()

    function next(data) {
        console.log('%c---------------------------------------------------------------', 'color:#bada55')
        // console.log('%cinnerNext....next参数........err','color:#bada55', err)
        console.log('%cinnerNext.....next参数及iteration的next的参数......data', 'color:#bada55', data)
        let rs = fnIterator.next(data)
        console.log('该rs为上一次yield后的执行的表达式结果组合成的value，done对象')
        console.log('%cinnerNext......iteration结果......res', 'color:#bada55', rs)
        if (rs.done) {
            console.log('====================结束', rs.value)
            return true
        }
        // next作为参数传入。。。暂停。。。执行异步操作。。。异步操作完成会执行next函数
        rs.value(next)
    }
    next()
}
run(myGenFunc)
// 解析End-----------------------------------


async function test() {
    let a = await runStart()
    console.log('=======a', a)
    let b = await runRight()
    console.log('=======b', b)
    let c = await runStop()
    console.log('=======c', c)
    let d = await runLeft()
    console.log('=======d', d)
    let e = await runEnd()
    console.log('=======e', e)
    return a + b + c + d + e
}
test().then((data) => {
    console.log('=====then', data)
})