// 我们会传递给你一个包含两个数字的数组。
// 返回这两个数字和它们之间所有数字的和。
// 最小的数字并非总在最前面。

// 等差求和
function sumAll(arr) {
    let max = Math.max(...arr); let min = Math.min(...arr);
    let sum = 0.5 * (max + min) * (max - min + 1);
    return sum;

}
// 实现迭代器
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        var val = this.start;
        if (this.start <= this.end) {
            this.start++;
            return { done: false, value: val };
        } else {
            return { done: true, value: undefined };
        }
    }
}
function sumAll(arr) {
    let sum = 0;
    let myRange = new Range(Math.min(...arr), Math.max(...arr));
    for (var value of myRange) {
        sum = sum + value;
    }
    console.log(sum)
    console.log(typeof sum)
    return sum;
}
sumAll([1, 4]);
sumAll([4, 1]);
sumAll([5, 10]);
sumAll([10, 5]);
console.log(...new Range(4, 7))

// 用generator实现迭代器
function* range(start = 0, end = 0, step = 1) {
    if (start > end) {
        [start, end] = [end, start]
    }
    // 數組有迭代器，數組是對象有keys方法數組下標（0,1,2,3）
    for (let i of Array((end - start) / step).keys()) {
        yield i * step + start
    }
}
function sumAll(arr) {
    let min = Math.min(...arr); let max = Math.max(...arr);

    return [...range(min, max)].reduce((sum, val) => {
        return sum + val;
    }, 0) + max;
}
// 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。
// Array.from()也可以
console.log(...range(1, 10))
console.log(range(10))