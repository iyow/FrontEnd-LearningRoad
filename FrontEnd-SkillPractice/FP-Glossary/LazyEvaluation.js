// Lazy evaluation(惰性求值)

// Lazy evaluation is a call-by-need evaluation mechanism
// 惰性求值是一种按需调用的计算机制
// that delays the evaluation of an expression until its value is needed. 
// 它将表达式的计算延迟，直到需要它的值为止。
// In functional languages, this allows for structures like infinite lists, 
// 在函数式语言中，这就为无限列表这样的结构创造了条件（allow for...考虑到；将…计算在内；为…酌留余地）
// which would not normally be available in an imperative language
// 这在命令式语言中通常不可用
// where the sequencing of commands is significant.
// 因为在命令式语言中命令的顺序很重要

const rand = function* () {
    let a = 0;
    while (1 < 2) {
        yield Math.random()
        a++;
        if (a === 2) { break; }
    }
    return 20;
}
const randIter = rand()
const randIter2 = rand()

// Each execution gives a random value, expression is evaluated on need.
// 每次计算都会给出不同随机数，表达式是在需要的时候才计算的
console.log(randIter[Symbol.iterator])
// there is reurn
console.log(randIter.next())
console.log(randIter.next())
console.log(randIter.next())

// there is no reurn   stop when next() done is true
for (let next of randIter2) {
    console.log(next)
}