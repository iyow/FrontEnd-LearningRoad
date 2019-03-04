// 策略模式，基于传统面向对象语言的模仿
// 一个基于策略模式的程序至少由两部分组成。
// 第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
// 第二个部分是环境类 Context，Context 接受客户的请求，随后把请求委托给某一个策略类。

// es5
// 策略类---獎金計算策略
var performanceS = function () { };
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};
var performanceA = function () { };
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};
var performanceB = function () { };
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};
// 环境类---奖金类 Bonus：
var Bonus = function () {
    this.salary = null; // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function (salary) {
    this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function () { // 取得奖金数额
    return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS()); // 设置策略对象
console.log(bonus.getBonus()); // 输出：40000
bonus.setStrategy(new performanceA()); // 设置策略对象
console.log(bonus.getBonus()); // 输出：30000 

console.log('=================================')
// es6
// 策略类
class Strategy {
    constructor() {
        console.log('Strategy create')
    }
    algorithmInterface() {
        console.log('Strategy.algorithmInterface invoked')
    }
}
class PerformanceS extends Strategy {
    constructor() {
        super()
        console.log('PerformanceS create')
    }
    calculate(salary) {
        return salary * 4
    }
}
class PerformanceA extends Strategy {
    constructor() {
        super()
        console.log('PerformanceA create')
    }
    calculate(salary) {
        return salary * 3
    }
}
class PerformanceB extends Strategy {
    constructor() {
        super()
        console.log('PerformanceB create')
    }
    calculate(salary) {
        return salary * 2
    }
}

// 环境类
class Context {
    constructor() {
        console.log('Context craete')
        this.strategy = null
    }
    setStrategy(strategy) {
        console.log('strategy set')
        this.strategy = strategy
    }
}
class BonusES6 extends Context {
    constructor() {
        super()
        this.salary = null
    }
    setSalary(salary) {
        this.salary = salary
    }
    getBonus() {
        return this.strategy.calculate(this.salary)
    }
}
let bonusEs6 = new BonusES6()
bonusEs6.setStrategy(new PerformanceA())
bonusEs6.setSalary(1000)
console.log(bonusEs6.getBonus())