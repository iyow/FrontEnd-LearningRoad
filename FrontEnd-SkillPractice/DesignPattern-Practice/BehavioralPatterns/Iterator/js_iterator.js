// 内部迭代器
// 内部迭代器在调用的时候非常方便，外界不用关心迭代器内部的实现，跟迭代器的交互也仅仅是一次初始调用，
// 但由于内部迭代器的迭代规则已经被提前规定所以灵活性较差
var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        // 把下标和元素当作参数传给 callback 函数
        let loopContinue = callback(i, ary[i])
        // 中止迭代器
        // callback 的执行结果返回 false，提前终止迭代
        if (loopContinue === false) {
            break;
        }
    }
};
each([1, 2, 3], function (i, n) {
    console.log([i, n]);
});

// 外部迭代器
// 外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。有更好的灵活性
var Iterator = function (obj) {
    var current = 0;
    var next = function () {
        current += 1;
    };
    var isDone = function () {
        return current >= obj.length;
    };
    var getCurrItem = function () {
        return obj[current];
    };
    // es6
    // var next = function () {
    //     return { value: array[nextIndex++], done: isDone() }
    // }
    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};


// ES6 迭代器
// 详细实现查看 JS-Practice/ES6/iterator.js
// 原理：类似外部迭代器实现   数据结构 部署 Iterator 接口
// Iterator 接口：返回包含next方法的对象
// 每调用next方法返回的是一个包含value和done的对象，
// {value: 当前成员的值,done: 布尔值} 
// for of,扩展运算符（...）,yield*都会调用该数据结构的Iterator接口