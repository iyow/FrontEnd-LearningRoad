// 通过代理实现 
// 把traditional.js中负责管理的的代码移除

// start es5
var CreateSingle = function (data) {
    this.init(data)
}
CreateSingle.prototype.init = function (data) {
    this.data = data;
}
var proxyCreateSingle = (function () {
    var instance;
    return function (data) {
        if (!instance) {
            instance = new CreateSingle(data);
        }
        return instance
    }
})()
// end

console.log('===================')
var a = new proxyCreateSingle('sven1');
var b = new proxyCreateSingle('sven2');
console.log(a)
console.log(b)
console.log(a === b); // true 
console.log('===================')

// start es6
class Single {
    constructor(data) {
        this.init(data)
    }
    init(data) {
        this.data = data
    }
}
let SingleProxy = (function() {
    let instance;
    return new Proxy(Single, {
        construct: function (target, args) {
            return instance || (instance = new target(...args))
        }
    })
})()
// end

console.log('---------------')
let obj1 = new SingleProxy('one')
let obj2 = new SingleProxy('two')
console.log(obj1)
console.log(obj2)
console.log('---------------')
