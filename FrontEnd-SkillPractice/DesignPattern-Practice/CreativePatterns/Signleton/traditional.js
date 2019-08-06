// start es5实现
var CreateSingle = (function () {
    var instance;
    var CreateSingle = function (data) {
        if (instance) {
            return instance;
        }
        this.init(data);
        return instance = this;
    };
    CreateSingle.prototype.init = function (data) {
        this.data = data;
    };
    return CreateSingle;
})();
// end

console.log('===================')
var a = new CreateSingle('sven1');
var b = new CreateSingle('sven2');
console.log(a)
console.log(b)
console.log(a === b); // true 
console.log('===================')


// start es6实现
class Singleton {
    constructor(data) {
        if (Singleton.prototype.Instance === undefined) {
            this.init(data)
            Singleton.prototype.Instance = this;
        }
        return Singleton.prototype.Instance;
    }
    init(data){
        this.data = data
    }

}
// end

console.log('---------------')
let ob1 = new Singleton("one");
let ob2 = new Singleton("two");
let ob3 = new Singleton("Three");
ob2.flag = 'Object flg';
console.log(ob1);
console.log(ob2);
console.log(ob3);
console.log(ob1 === ob2);
console.log(ob1 === ob3);
console.log('---------------')