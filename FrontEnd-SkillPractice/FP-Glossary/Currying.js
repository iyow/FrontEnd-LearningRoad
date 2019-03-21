// Currying(柯里化)
// The process of converting a function 
// that takes multiple arguments into a function
// that takes them one at a time.
// 将带有多个参数的函数转换为一次一个函数的函数的过程

const sum = (a, b) => a + b
const curriedSum = (a) => (b) => a + b

curriedSum(40)(2)

const add2 = curriedSum(2)  // (b) => 2 + b
add2(10)

// 创建柯里化函数通用方式---
// function currying(fn, ...outerArgs) {
//     return function (...innerArg) {
//         return fn.apply(null, outerArgs.concat(innerArg))
//     }
// }
const currying = (fn, ...outerArgs) => (...innerArg) => fn.apply(null, outerArgs.concat(innerArg))
const bind = (fn, context, ...outerArgs) => (...innerArg) => fn.apply(context, outerArgs.concat(innerArg))

let add5 = currying(sum, 5)
console.log(add5(5))

let add56 = currying(sum, 5, 6)
console.log(add56())


