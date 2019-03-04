// 之前我们让 strategy 对象从各个策略类中创建而来，这是模拟一些传统面向对象语言的实现。
// 实际上在 JavaScript 语言中，函数也是对象，所以更简单和直接的做法是把 strategy 直接定义为函数
// 同样，Context 也没有必要必须用 Bonus 类来表示，我们依然用 calculateBonus 函数充当Context 来接受用户的请求。

const strategies = {
    'S': function (salary) {
        return salary * 4
    },
    'A': function (salary) {
        return salary * 3
    },
    'B': function (salary) {
        return salary * 2
    }
}

let calculateBonus = function (strategy, salary) {
    return strategies[strategy](salary);
}

console.log(caculateBonus('S', 1000))
console.log(caculateBonus('A', 1000))


// Peter Norvig 在他的演讲中曾说过：“在函数作为一等对象的语言中，策略模式是隐形的。
// strategy 就是值为函数的变量。”在 JavaScript 中，除了使用类来封装算法和行为之外，使用函数
// 当然也是一种选择。这些“算法”可以被封装到函数中并且四处传递，也就是我们常说的“高阶
// 函数”。实际上在 JavaScript 这种将函数作为一等对象的语言里，策略模式已经融入到了语言本身
// 当中，我们经常用高阶函数来封装不同的行为，并且把它传递到另一个函数中。当我们对这些函
// 数发出“调用”的消息时，不同的函数会返回不同的执行结果。在 JavaScript 中，“函数对象的多态性”来得更加简单。

// 之前为了清楚地表示这是一个策略模式，我们特意使用了 strategies 这个名字。如果去掉 strategies，我们还能认出这是一个策略模式的实现吗？

var S = function (salary) {
    return salary * 4;
};
var A = function (salary) {
    return salary * 3;
};
var B = function (salary) {
    return salary * 2;
};
var calculateBonus = function (func, salary) {
    return func(salary);
};
calculateBonus(S, 10000); // 输出：40000