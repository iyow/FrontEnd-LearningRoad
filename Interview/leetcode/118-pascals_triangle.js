
// 杨辉三角
// 1. 递归   
// 问题---求每个值的时候都会递归到顶层？
function getLineValue(i, j) {
    if (j === 0 || i === j) {
        return 1
    } else {
        return getLineValue(i - 1, j) + getLineValue(i - 1, j - 1)
    }
}
function yanghui(whichLine) {
    for (let i = 0; i < whichLine; i++) {
        let arr = []
        for (let j = 0; j <= i; j++) {
            arr.push(getLineValue(i, j))
            // console.log(getLineValue(i, j))
        }
        console.log('-----', arr)
    }
}

// 2. 循环迭代
function yanghui(whichLine) {
    let lastArr = []
    for (let i = 0; i < whichLine; i++) {
        let arr = []
        for (let j = 0; j <= i; j++) {
            // arr.push(getLineValue(i, j))
            // console.log(getLineValue(i, j))
            if (j === 0 || i === j) {
                arr.push(1)
            } else {
                let s = j - 1
                let e = s + 1
                arr.push(lastArr[s] + lastArr[e])
            }
        }
        lastArr = arr
    }
}


// 使用生成器和迭代器 暂停执行 + map缓存
function* yanghuiG(whichLine, ctrlFunc) {
    let lastArr = []
    for (let i = 0; i < whichLine; i++) {
        let arr = []
        for (let j = 0; j <= i; j++) {
            // arr.push(getLineValue(i, j))
            // console.log(getLineValue(i, j))
            if (j === 0 || i === j) {
                arr.push(1)
            } else {
                let s = j - 1
                let e = s + 1
                arr.push(lastArr[s] + lastArr[e])
            }
        }
        lastArr = arr
        console.log('-----', arr)
        let nextCtrl = yield arr
        ctrlFunc(nextCtrl)
        console.log("next--------", nextCtrl)
        if (nextCtrl === 'clear') {
            return 'clear'
        }
    }
}
let symbol_iter = Symbol('iter')
let symbol_iter_index = Symbol('iter_index')
let symbol_cache = Symbol('iter_cache')

class yanghuiIter {
    constructor() {
        this[symbol_iter] = yanghuiG(Infinity)
        // Reflect.defineProperty(this, symbol_iter_index, { value: 0, configurable: false, enumerable: false, writable: true })
        this[symbol_iter_index] = 0
        this[symbol_cache] = {}
    }
    getK(kline) {
        let hasCache = this[symbol_cache][kline]
        if (!hasCache) {
            while (this[symbol_iter_index] <= kline) {
                let v = this[symbol_iter].next()
                if (v.done) {
                    this[symbol_iter] = yanghuiG(Infinity)
                    let i = this[symbol_iter_index]
                    while (i >= 0) {
                        this[symbol_iter].next();
                        i--;
                    }
                }
                this[symbol_cache][this[symbol_iter_index]] = v.value
                this[symbol_iter_index]++
            }
        }
        return this[symbol_cache][kline]
    }
    stopG() {
        let v = this[symbol_iter].next('clear')
        console.log(v)
    }
}

// TODO：使得 getK 变得更纯净
// 显式API > 通用API 
// cacheGetK 对getK进行包装

let singleYanghui = {
    [symbol_iter]: yanghuiG(Infinity),
    [symbol_iter_index]: 0,
    [symbol_cache]: {},
    getK(kline) {
        let hasCache = this[symbol_cache][kline]
        if (!hasCache) {
            while (this[symbol_iter_index] <= kline) {
                let v = this[symbol_iter].next()
                if (v.done) {
                    this[symbol_iter] = yanghuiG(Infinity)
                    let i = this[symbol_iter_index]
                    while (i >= 0) {
                        this[symbol_iter].next();
                        i--;
                    }
                }
                this[symbol_cache][this[symbol_iter_index]] = v.value
                this[symbol_iter_index]++
            }
        }
        return this[symbol_cache][kline]
    }
}