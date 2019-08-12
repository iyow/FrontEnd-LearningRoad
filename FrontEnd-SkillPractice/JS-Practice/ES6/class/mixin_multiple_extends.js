const a = {
    a: 'a'
};
const b = {
    b: 'b'
};
// 通过结构操作符合并两个对象
const c = {
    ...a,
    ...b
};
// {a: 'a', b: 'b'}

// 通过属性拷贝(mixin)实现多重继承
function mix(...mixins) {
    class Mix {
        constructor(argObj) {
            for (let mixin of mixins) {
                // 拷贝实例属性
                // 将需要继承的类(父类)的实例属性  在混合(mixin)父类实例化时都添加到 混合(mixin)父类的实例上
                copyProperties(this, new mixin(argObj));
            }
        }
    }

    for (let mixin of mixins) {
        // 拷贝静态属性
        // 将需要继承的类(父类)的静态属性 添加到 混合(mixin)父类上
        copyProperties(Mix, mixin);

        // 拷贝原型属性
        // 将需要继承的类(父类)的原型属性 添加到 混合(mixin)父类原型属性上
        copyProperties(Mix.prototype, mixin.prototype);
    }

    return Mix;
}

function copyProperties(target, source) {
    // Reflect.ownKeys方法用于返回对象的所有属性，
    // 基本等同于Object.getOwnPropertyNames
    // 与Object.getOwnPropertySymbols之和。
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' &&
            key !== 'prototype' &&
            key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

class A {
    static AA = 'static AA'
    constructor({ a }) {
        this.a = a
    }
    getA() {
        return this.a
    }
    static getAA() {
        return A.AA
    }
}
class B {
    static BB = 'static BB'
    constructor({ b }) {
        this.b = b
    }
    static getBB() {
        return B.BB
    }

    get NB() {
        return this.b
    }
    set NB(value) {
        return this.b = value
    }
}
// 使用时 继承混合父类
class testMultipleFather extends mix(A, B) {
    constructor({ test, ...other }) {
        // 传参使用对象 解构 很方便
        super(other);
        this.test = test
    }
    getTest() {
        return this.test
    }
}
console.log(new testMultipleFather({
    test: 'im son test',
    a: 'im father a',
    b: 'im father b'
}));
