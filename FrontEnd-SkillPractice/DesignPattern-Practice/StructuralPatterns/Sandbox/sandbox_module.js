// JavaScript本身中没有提供命名空间机制，所以为了避免不同函数、对象以及变量名对全局空间的污染，
// 通常的做法是为你的应用程序或者库创建一个唯一的全局对象，然后将所有方法与属性添加到这个对象上。


// 你可以用一个全局构造器，而不是一个全局对象，我们给这个构造器起名为Sandbox(),
// 采用同一构造器(Constructor)生成彼此独立且互不干扰(self-contained)的实例对象
// 你可以用这个构造器创建对象，你还可以为构造器传递一个回调函数作为参数，这个回调函数就是你存放代码的独立沙箱环境。

// YUI core3
//SandBox(['module1,module2'],function(box){});
/*
* @function
* @constructor
* @param []  array   使用到的模块名数组(需要之前添加/注册到module上)
* @param callback function 回调函数
* 功能：新建一块可用于模块运行的环境(沙箱)，
* 自己的代码放在回调函数里，
* 且不会对其他的个人沙箱造成影响和js模块模式配合得天衣无缝
*
* */
function SandBox() {
    //私有的变量
    var args = Array.prototype.slice.call(arguments),
        // 最后以参数是回调函数
        callback = args.pop(),
        //模块可以作为一个数组传递，或作为单独的参数传递
        modules = (args && typeof args[0] == "string") ? args : args[0];
    //确保该函数作为构造函数调用
    if (!(this instanceof SandBox)) {
        return new SandBox(modules, callback);
    }

    // add properties to 'this' as needed: 
    // this.a = 1;
    // this.b = 2;
    //不指定模块名和“*”都表示“使用所有模块”
    if (!modules || modules[0] === "*") {
        modules = [];
        for (value in SandBox.modules) {
            modules.push(i);
        }
    }

    //初始化所需要的模块（将想要的模块方法添加到box对象上）
    for (var i = 0; i < modules.length; i++) {
        if (SandBox.modules.hasOwnProperty(modules[i])) {
            SandBox.modules[modules[i]](this);
        }
    }
    //自己的代码写在回调函数里，this就是拥有指定模块功能的box对象
    callback(this);
}
SandBox.prototype = {
    name: "My Application",
    version: "1.0",
    getName: function () {
        return `${this.name} ${this.version}`;
    }
};




// 预定义的模块，添加模块
SandBox.modules = {};
SandBox.modules.event = function (box) {
    //私有属性
    var xx = "xxx";
    //公共方法
    box.attachEvent = function () {
        console.log("modules:event------API:attachEvent")
    };
    box.dettachEvent = function () {
    };
}
SandBox.modules.ajax = function (box) {
    var xx = "xxx";
    box.makeRequest = function () {
    };
    box.getResponse = function () {
    };
}
SandBox('event', function (box) {
    console.log(box)
    box.attachEvent();
})


// 使用方法
//使用new操作符
new SandBox(function (box) {
    console.log('----------不加载任何模块', box);
})
//忽略new操作符的方法
SandBox(['ajax', 'event'], function (box) {
    console.log('----------数组方式加载模块', box);
})
//直接传单个参数
SandBox('ajax', 'dom', function (box) {
    console.log('----------一个一个传递模块', box);
})
//Sandbox的嵌套
SandBox('dom', 'event', function (box) {
    //一些代码
    SandBox('ajax', function (box) {
        //这里的box和外部对象的box并不相同
    })
})
