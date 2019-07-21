/*
箭头函数
1.不能作为构造函数，不能使用new
2.不绑定arguments，使用rest参数解决
3.不绑定this，会捕获其所在上下文的this值作为自己的this值
4.箭头函数 通过call和apply 方法调用一个函数时 只传入一个参数 对this没有影响
5.没有原型属性(prototype)
6.不能作为Generator函数，不能使用yield关键字
*/

/*
    y = 3x^2 + 2x + 1
    z = 4y^2 + 5y^2 + 6
    if x = 2 solve (2z^2 - 4)/3 = ?
*/

// 传统编程方式
let resolveYX = (x) => 3 * x * x + 2 * x + 1;
let resolveZY = (y) => 4 * y * y * y + 5 * y * y + 6;
let resolveRZ = (z) => (2 * z * z - 4) / 3;
let y = resolveYX(2)
let z = resolveZY(y);
let result = resolveRZ(z);

// 数学解法
// 你很清楚那些中间变量对于得到正确的结果来说没有什么意义，
// 而这样解题效率更高，尤其是当前面的环节和后面的环节可以抵消掉某些互逆的运算时。
/*
    r = (2z^2 - 4)/3
      = (2*(4y^2 + 5y^2 + 6)^2)/3
      = (2*(4*(3x^2 + 2x + 1)^2 + 5*(3x^2 + 2x + 1)^2 + 6)^2)/3
      化简带入求值
      = f(x)
*/

// 需求抽象---需要传入x，然后经历3个步骤后得到一个答案y
function Task(value) {
    this.value = value;
}

Task.prototype.step = function (fn) {
    let _newValue = fn(this.value);
    return new Task(_newValue);
    // this.value = fn(this.value)
    // return this
}

let fn1 = resolveYX, fn2 = resolveZY, fn3 = resolveRZ

y = (new Task(x)).step(fn1).step(fn2).step(fn3);

// 函数式代码推演
// 用数学的眼光看待所发生的事情。
// 通过一系列变换操作，将一个数据集x变成了数据集y，y=f(x)
// 这就是我们熟知的【方程】,或者【映射】

// 第一次代码改造
/*
function prepare() {
    return function (x) {
        return (new Task(x)).step(fn1).step(fn2).step(fn3);
    }
}
*/
let prepare = function (x) {
    return (new Task(x)).step(fn1).step(fn2).step(fn3)
}

let f = prepare;
let y = f(x);

// ---------------------------------------------------------------------------------

// 编写一个用于生成新函数的高阶函数，来实现局部调用
let goStep = function (fn) {
    return function (params) {
        let value = fn(params.value);
        return new Task(value);
    }
}
//fn2Result.step(fn3)这一句将被转换为如下形式
let requireFn2Result = goStep(fn3);

// 一步步改造prepare函数
prepare = function (x) {
    let fn2Result = (new Task(x)).step(fn1).step(fn2);
    // fn2Result 是一个Task value 为 X->fn1->fn2后的值
    // requireFn2Result是一个包裹了fn3的高阶函数
    return requireFn2Result(fn2Result);
}

// ---------------------------------------------------------------------------------

// 继续来简化前置步骤
// let requireFn2Result = goStep(fn3);
let requireFn1Result = goStep(fn2);
let requireInitResult = goStep(fn1);

prepare = function (x) {
    let InitResult = new Task(x);
    // X->fn1->fn2->fn3
    return requireFn2Result(requireFn1Result(requireInitResult(InitResult)));
}

// ---------------------------------------------------------------------------------

// 把new Task(x)也函数化
let createTask = function (x) {
    return new Task(x);
};
prepare = function (x) {
    // X->fn1->fn2->fn3
    return requireFn2Result(requireFn1Result(requireInitResult(createTask(x))));
}
// 回到之前的映射
f = prepare;
y = f(x);
// 回顾
// 在中间环节的组装过程中，其实并没有任何真实的数据出现，
// 我们只使用了暂态的抽象数据来帮助我们写出映射方法f的细节，
// 而随后暂态的数据又被新的函数取代，逐级迭代，直到暂态数据最终指向了最外层函数的形参

// ---------------------------------------------------------------------------------

// 进一步抽象
// 扁平化prepare调用链
/**
*定义一个工具函数compose,接受两个函数作为参数，返回一个新函数
*新函数接受一个x作为入参，然后实现函数的迭代调用。
*/
var compose = function (f, g) {
    return function (x) {
        return f(g(x));
    }
};
/**
*升级版本的compose函数，接受一组函数，实现左侧函数包裹右侧函数的形态
*/
let composeEx = function (...args) {
    return (x) => args.reduceRight((pre, cur) => cur(pre), x);
}

// ---------------------------------------------------------------------------------

// 重构prepare
let pipeline = composeEx(requireFn2Result, requireFn1Result, requireInitResult, createTask);
// prepare = function (x) {
//     return pipeline(x);
// }
// 即
prepare = pipeline
f = prepare;
y = f(x);

// 至此完整结束
// y = f(x) = prepare(x) = pipline(x) = composeEx(requireFn2Result, requireFn1Result, requireInitResult, createTask);
// ---------------------------------------------------------------------------------
// 程序设计 = 数据结构 + 算法   Vs   函数式编程 = 数据 + 函数
