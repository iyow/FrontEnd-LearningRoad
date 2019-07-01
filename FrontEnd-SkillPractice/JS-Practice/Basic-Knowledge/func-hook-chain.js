
Function.prototype.before = function (beforefn) {
    console.log('before===outter===this', this)
    var __self = this; // 保存原函数的引用
    return function () { // 返回包含了原函数和新函数的"代理"函数
        console.log('before===innnerr===this', this)

        beforefn.apply(this, arguments); // 执行新函数，修正 this
        return __self.apply(this, arguments); // 执行原函数
    }
};
var func = function () {
    console.log('funccccc====', this)
}
func.before(() => {
    console.log('before===runnnn', this)
})()