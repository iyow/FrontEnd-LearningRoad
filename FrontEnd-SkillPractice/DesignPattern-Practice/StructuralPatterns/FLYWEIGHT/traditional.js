// 共享实例管理工厂  共享池
class FlyweightFactory {
    constructor() {
        this.flyweights = {};
        console.log('FlyweightFactory Class created');
    }

    getFlyweight(key) {
        console.log('FlyweightFactory.getFlyweight invoked');
        if (this.flyweights[key]) {
            return this.flyweights[key];
        } else {
            this.flyweights[key] = new ConcreteFlyweight(key);
            return this.flyweights[key];
        }
    }

    createGibberish(keys) {
        console.log('FlyweightFactory.createGibberish invoked');
        return new UnsharedConcreteFlyweight(keys, this);
    }
}

// 抽象类
class Flyweight {
    constructor() {
        console.log('Flyweight Class created');
    }

    operation(extrinsicState) {
        console.log('Flyweight.operation invoked');
    }
}

// 可共享
class ConcreteFlyweight extends Flyweight {
    constructor(key) {
        console.log('创建 -------==================---------', key)
        super();
        this.intrinsicState = key;
        console.log('ConcreteFlyweight Class created');
    }

    operation(extrinsicState) {
        console.log('ConcreteFlyweight.operation invoked');
        return extrinsicState + this.intrinsicState;
    }
}

// 不可共享
class UnsharedConcreteFlyweight extends Flyweight {
    constructor(keys, flyweightsfactory) {
        super();
        this.flyweights = flyweightsfactory;
        this.keys = keys;
        console.log('UnsharedConcreteFlyweight Class created');
    }

    operation(extrinsicState) {
        console.log('UnsharedConcreteFlyweight.operation invoked');
        var key, word = '';
        for (var i = 0; i < extrinsicState; i++) {
            key = this.keys[Math.floor(Math.random() * (this.keys.length))];
            console.log(key)
            word = this.flyweights.getFlyweight(key).operation(word);
        }
        console.log('UnsharedConcreteFlyweight Operation: ');
        console.log(word);
    }
}


let theFlyPool = new FlyweightFactory();
let gibberish = theFlyPool.createGibberish(['-', '+', '*']);
gibberish.operation(5);