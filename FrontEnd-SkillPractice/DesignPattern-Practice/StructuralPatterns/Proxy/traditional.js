class Subject {
    constructor() {
        console.log('Subject Class created');
    }

    request() {
        console.log('Subject.request invoked');
    }
}

class RealSubject extends Subject {
    constructor() {
        super()
        console.log('RealSubject Class created');
    }

    request() {
        console.log('RealSubject.request invoked');
    }
    mult(...params) {
        console.log('开始计算乘积');
        var a = 1;
        for (var i = 0, l = params.length; i < l; i++) {
            a = a * params[i];
        }
        return a;
    }
}

// 通过继承重写方法 并 调用父级方法
class ProxySubject extends Subject {
    constructor() {
        super()
        console.log('ProxySubject Class created');
        this.realSubject = new RealSubject();
        this.multCache = {}
    }

    request() {
        // do something then 
        this.realSubject.request();
    }
    mult(...params) {
        let p = params.join('')
        if (!(p in this.multCache)) {
            this.multCache[p] = this.realSubject.mult(...params)
        }
        return this.multCache[p]
    }
}

var proxy = new ProxySubject()
proxy.request()
proxy.mult(1,2,3)
proxy.mult(1,2,3)
