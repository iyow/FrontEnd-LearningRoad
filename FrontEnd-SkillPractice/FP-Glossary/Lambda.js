// Lambda

// An anonymous function that can be treated like a value.
// 一个可以像值一样对待的匿名函数。
; (function (a) {
    return a + 1
})

; (a) => a + 1

// Lambdas are often passed as arguments to Higher-Order functions.
// Lambdas经常作为参数传递给高阶函数
;[1, 2].map((a) => a + 1) // [2, 3]

// You can assign a lambda to a variable.
// 你也可以将lambda分配给变量
const add1 = (a) => a + 1