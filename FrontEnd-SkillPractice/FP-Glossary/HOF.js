// Higher-Order Functions (HOF)   高阶函数
// A function which takes a function as an argument and/or returns a function.
// 将函数作为参数和/或返回函数的函数。

const filter = (predicate, xs) => xs.filter(predicate)
const is = (type) => (x) => Object(x) instanceof type
filter(is(Number), [0, '1', 2, null]) // [0, 2]