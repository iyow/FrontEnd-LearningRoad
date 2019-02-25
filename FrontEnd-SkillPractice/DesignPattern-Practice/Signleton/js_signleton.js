const getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
};

// 实现单例的逻辑函数   需要返回值
let func1 = function () {
    console.log('创建')
    return {
        name:'单例one'
    }
}
// 实现单例的逻辑函数
let func2 = function () {
    console.log('创建',this)
    return {
        name:'单例two'
    }
}

let createSingleOne = getSingle(func1)
let createSingleTwo = getSingle(func2)

createSingleOne()
createSingleOne()
createSingleOne()
console.log('---------------')
createSingleTwo()
createSingleTwo()
createSingleTwo()