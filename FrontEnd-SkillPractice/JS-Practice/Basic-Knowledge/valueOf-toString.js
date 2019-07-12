// valueOf()：返回最适合该对象类型的原始值；
// toString(): 将该对象的原始值以字符串形式返回。
// 这两个方法一般是交由JS去隐式调用，以满足不同的运算情况。
// 在数值运算里，会优先调用valueOf()，如a + b；
// 在字符串运算里，会优先调用toString()，如alert(c)。


let a = {
    valueOf: function () {
        console.log('valueOf---')
        return 123
    },
    toString() {
        console.log('toString')
        return 'haha'
    }
}

console.log(a + 1)
console.log(Number(a))
console.log(a)
console.log(String(a))
console.log(a * 2)
console.log(`${a}`) //原始， [object object]

String.prototype.toString = function () {
    return 'hello world'
}
Number.prototype.valueOf = function () {
    return 666
}
Number.prototype.toString = function () {
    return '666'
}

let num = 456
let str = 'nihao'

console.log(num)
console.log(str)
console.log(num.valueOf())
console.log(Number(num))
console.log(str.toString())
console.log(String(str))