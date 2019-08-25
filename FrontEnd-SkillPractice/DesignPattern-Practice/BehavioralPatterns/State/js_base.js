// 状态模式和策略模式的关系
// 是策略模式中的各个策略类之间是平等又平行的，它们之间没有任何联系，
// 所以客户必须熟知这些策略类的作用，以便客户可以随时主动切换算法；而在状态模式中，状态
// 和状态对应的行为是早已被封装好的，状态之间的切换也早被规定完成，“改变行为”这件事情
// 发生在状态模式内部。

// JavaScript 版本的状态机
// 了通过 Function.prototype.call 方法直接把请求委托给某个字面量对象来执行。
var FSM = {
    off: {
        buttonWasPressed: function () {
            console.log('关灯');
            this.button.innerHTML = '下一次按我是开灯';
            this.currState = this.onState;
        }
    },
    on: {
        buttonWasPressed: function () {
            console.log('开灯');
            this.button.innerHTML = '下一次按我是关灯';
            this.currState = this.offState;
        }
    }
};

// 更加轻巧的做法
var litLight = function () {
    this.currState = FSM.off; // 设置当前状态
    this.button = null;
};
// 使用delegate 函数来完成这个状态机编写。
// 这是面向对象设计和闭包互换的一个例子，前者把变量保存为对象的属性，而后者把变量封闭在闭包形成的环境中
var delegate = function (client, delegation) {
    return {
        buttonWasPressed: function () { // 将客户的操作委托给 delegation 对象
            return delegation.buttonWasPressed.apply(client, arguments);
        }
    }
};
var Light = function () {
    this.offState = delegate(this, FSM.off);
    this.onState = delegate(this, FSM.on);
    this.currState = this.offState; // 设置初始状态为关闭状态
    this.button = null;
};

Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
        self.currState.buttonWasPressed();
        //litLight 把请求委托给 FSM 状态机
        // self.currState.buttonWasPressed.call(self);
    }
};
var light = new Light();
light.init();


// 表驱动的有限状态机
// 其实还有另外一种实现状态机的方法，这种方法的核心是基于表驱动的。我们可以在表中很
// 清楚地看到下一个状态是由当前状态和行为共同决定的。这样一来，我们就可以在表中查找状态，
// 而不必定义很多条件分支，
// 状态转移表
// 当前状态→条件↓ 状态 A 状态 B 状态 C
// 条件 X         … … …
// 条件 Y         … 状态 C …
// 条件 Z         … …
// 相关的库实现：https:// github.com/jakesgordon/javascript-state-machine


// ----------------------------------------------------

// Generator 是实现状态机的最佳结构。
var ticking = true;
var clock = function () {
    if (ticking)
        console.log('Tick!');
    else
        console.log('Tock!');
    ticking = !ticking;
}


// clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。
// 这个函数如果用 Generator 实现，就是下面这样。
var gClock = function* () {
    let branch = ''
    while (true) {
        console.log('Tick!');
        branch = yield 'Tick';
        console.log('------which branch', branch)
        console.log('Tock!');
        yield 'Tock';
    }
};

let iGClock = gClock()
setInterval(() => {
    let currentState = iGClock.next('some situation to change statge')
    console.log('------currentState', currentState)
}, 1000);