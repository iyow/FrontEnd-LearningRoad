// 柯里化
function curry(fn) {
    // debugger
    let length = fn.length
    let innerLength = 0
    let argsArr = []
    let curryFN = function () {
        innerLength = innerLength + arguments.length
        argsArr.push(...arguments)
        if (innerLength >= length) {
            let r = fn(...argsArr)
            argsArr = []
            innerLength = 0
            return r
        } else {
            return curryFN
        }
    }
    return curryFN
}

function xs(a, b, c, d) {
    console.log('-------result', arguments)
    return a + b * c - d
}

let cxs = curry(xs)
console.log(cxs(1)(2)(3)(4))
console.log(cxs(1)(2)(3, 4))
console.log(cxs(1, 2, 3, 4))


// // 简单实现，参数只能从右到左传递
// function createCurry(func, args) {

//     var arity = func.length;
//     var args = args || [];

//     return function () {
//         var _args = [].slice.call(arguments);
//         [].push.apply(_args, args);

//         // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
//         if (_args.length < arity) {
//             return createCurry.call(this, func, _args);
//         }

//         // 参数收集完毕，则执行func
//         return func.apply(this, _args);
//     }
// }

// var currying = function(fn) {
//     var args = [].slice.call(arguments, 1);

//     return function() {
//         // 主要还是收集所有需要的参数到一个数组中，便于统一计算
//         var _args = args.concat([].slice.call(arguments));
//         return fn.apply(null, _args);
//     }
// }