// JavaScript 开发中用到继承的场景其实并不是很多，
// 很多时候我们都喜欢用 mix-in 的方式给对象扩展属性。
// 模板方法（Template Method）--- 一种基于继承的设计模式

// 抽象类
// 模板方法模式是一种严重依赖抽象类的设计模式。
// JavaScript 在语言层面并没有提供对抽象类的支持，我们也很难模拟抽象类的实现。
// 抽象类不能被实例化。
var Beverage = function () {};
Beverage.prototype.boilWater = function () {
    console.log('把水煮沸');
};
// 空方法，应该由子类重写,抽象方法
Beverage.prototype.brew = function () {
    throw new Error('子类必须重写 brew 方法');
};
// 空方法，应该由子类重写,抽象方法
Beverage.prototype.pourInCup = function () {
    throw new Error('子类必须重写 pourInCup 方法');
};
// 空方法，应该由子类重写,抽象方法
Beverage.prototype.addCondiments = function () {
    throw new Error('子类必须重写 addCondiments 方法');
};

// 钩子方法(hook)
// 放置钩子是隔离变化的一种常见手段
// 我们在父类中容易变化的地方放置钩子，
// 钩子可以有一个默认的实现，究竟要不要“挂钩”，这由子类自行决定。
// 默认需要调料
Beverage.prototype.customerWantsCondiments = function () {
    return true;
};
// Beverage.prototype.init 被称为模板方法，该方法中封装了子类的算法框架，
// 它作为一个算法的模板，指导子类以何种顺序去执行哪些方法。
Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) { // 如果挂钩返回 true，则需要调料
        this.addCondiments();
    }
};


var Coffee = function () {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
};
Coffee.prototype.customerWantsCondiments = function () {
    return window.confirm('请问需要调料吗？');
};
var Coffee = new Coffee();
Coffee.init();


var Tea = function () {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function () {
    console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function () {
    console.log('把茶倒进杯子');
};
Tea.prototype.addCondiments = function () {
    console.log('加柠檬');
};
var tea = new Tea();
tea.init();



// ### 好莱坞原则

// > 我们允许底层组件将自己挂钩到高层组件中，
// 而高层组件会决定什么时候、以何种方式去使用这些底层组件，
// 高层组件对待底层组件的方式，就像“别调用我们，我们会调用你”。

// 常见场景
// - 模板方法模式是好莱坞原则的一个典型使用场景，
// - 发布—订阅模式
// 发布者会把消息推送给订阅者
// - 回调函数，
// 把需要执行的操作封装在回调函数里，然后把主动权交给另外一个函数。
// 至于回调函数什么时候被执行，则是另外一个函数控制的



// more js 更加JS的写法
var Beverage = function (param) {
    var boilWater = function () {
        console.log('把水煮沸');
    };
    var brew = param.brew || function () {
        throw new Error('必须传递 brew 方法');
    };
    var pourInCup = param.pourInCup || function () {
        throw new Error('必须传递 pourInCup 方法');
    };
    var addCondiments = param.addCondiments || function () {
        throw new Error('必须传递 addCondiments 方法');
    };
    var F = function () {};
    F.prototype.init = function () {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };
    return F;
};
var Coffee = Beverage({
    brew: function () {
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function () {
        console.log('把咖啡倒进杯子');
    },
    addCondiments: function () {
        console.log('加糖和牛奶');
    }
});
var Tea = Beverage({
    brew: function () {
        console.log('用沸水浸泡茶叶');
    },
    pourInCup: function () {
        console.log('把茶倒进杯子');
    },
    addCondiments: function () {
        console.log('加柠檬');
    }
});
var coffee = new Coffee();
coffee.init();
var tea = new Tea();
tea.init();