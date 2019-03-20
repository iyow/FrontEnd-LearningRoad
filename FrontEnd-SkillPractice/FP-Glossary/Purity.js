// Purity(纯度)
// Definition：adheres to two rules:（遵循两个规则）
// A function is pure if the return value is only determined by its input values,(返回值仅由其输入值确定)
// and does not produce side effects.(并且不会产生副作用)

// Right
const greet = (name) => `Hi, ${name}`
greet('Brianne') // 'Hi, Brianne'

// Wrong

// 由于输出基于存储在函数外部的数据
global.name = 'Brianne'
const greetFun = () => `Hi, ${global.name}`
greetFun() // 'Hi, Brianne'

// 修改了函数之外的状态
let greeting
const greetFunc = (name) => {
    greeting = `Hi, ${name}`
}
greetFunc('Brianne')
greeting // 'Hi, Brianne'