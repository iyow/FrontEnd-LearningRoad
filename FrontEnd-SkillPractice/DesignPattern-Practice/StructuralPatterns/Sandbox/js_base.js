// 沙箱模式，模块模式，模块化
// 利用函数可以构建作用域,其上级作用域不能直接访问下级作用域中的数据的特点
// 具体是用立即执行函数表达式(IIFE: Immediately Invoked Function Expression)
//普通模式1
var num1 = 0;
for (var i = 1; i <= 100; i++) {
    num1 += i;
}
console.log(num1);//5050

//普通模式2
function test() {
    var num2 = 0;
    for (var i = 1; i <= 100; i++) {
        num2 += i;
    }
    console.log(num2);//5050
}
test();

//沙箱模式
(function () {
    var num3 = 0;
    for (var i = 1; i <= 100; i++) {
        num3 += i;
    }
    console.log(num3);//5050
})();

console.log(num1);//还可以打印5050
console.log(num2);//爆红,num2 is not defined
console.log(num3);//爆红,num3 is not defined

(function (w) {
    var Cat = {
        eat: function () {
            console.log("吃");
        }
    }
    w.cat = w.$ = Cat;
})(window)