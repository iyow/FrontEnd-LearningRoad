// 惰性加载函数

// 在函数内部会重写这个函数，
// 重写之后的函数就是我们期望的 addEvent 函数，在下一次进入 addEvent 函数的时候，addEvent
// 函数里不再存在条件分支语句
var addEvent = function (elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function (elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    } else if (window.attachEvent) {
        addEvent = function (elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
    addEvent(elem, type, handler);
};


// 注意
// 按照“惰性载入函数”的说法，alwaysIf应该比noIf显著地慢，因此我们需要用那种花里胡哨的手段替换掉alwaysIf里面的一大串if
// 但在现代的浏览器中，两者的运行速度几乎一样。（测试使用的为Chrome67+benchmark）
// 总之事实就是，现代JavaScript引擎的分支预测能力已经相当变态了，没有必要让程序员多花精力实现那种别扭的东西。