// 抽象类
class Subject {
    constructor() {
        console.log('Subject Class created');
    }
    // 添加Observer
    attach() {
        throw new Error("This method must be overwritten!");
    }
    // 删除Observer
    dettach() {
        throw new Error("This method must be overwritten!");
    }
    // 通知Observer
    notify() {
        throw new Error("This method must be overwritten!");
    }
}
// 抽象类
class Observer {
    constructor() {
        console.log('Observer Class created');
    }

    update() {
        throw new Error("This method must be overwritten!");
    }
}

class ConcreteSubject extends Subject {
    constructor() {
        super();
        this.subjectState = null;
        this.observers = [];
        console.log('ConcreteSubject Class created');
    }
    // @override 覆盖重写
    attach(observer) {
        this.observers.push(observer);
        console.log('ConcreteSubject.attach invoked');
    }

    dettach(observer) {
        console.log('ConcreteSubject.dettach invoked');
        for (var i in this.observers) {
            if (this.observers[i] === observer) {
                this.observers.splice(i, 1);
            }
        }
    }

    notify(context=this) {
        console.log('ConcreteSubject.notify invoked');
        for (var i in this.observers) {
            this.observers[i].update(context);
        }
    }
}

class RealSubject extends ConcreteSubject {
    constructor() {
        super();
        this.subjectState = null;
        console.log('RealSubject Class created');
    }
    // 业务功能应该
    getState() {
        console.log('RealSubject.getState invoked');
        return this.subjectState;
    }

    setState(state) {
        console.log('RealSubject.setState invoked');
        this.subjectState = state;
        super.notify();
        // this.notify();
    }
}


class ConcreteObserver extends Observer {
    constructor(flag) {
        super();
        this.observerState = flag+' ';
        console.log('ConcreteObserver Class created');
    }
    // @override 覆盖重写
    update(Subject) {
        console.log('ConcreteObserver.update invoked');
        this.observerState += Subject.getState();
        console.log('ConcreteObserver new state: ' + this.observerState);
    }
}

var observer1 = new ConcreteObserver('aaaaaa');
var observer2 = new ConcreteObserver('bbbbbb');
var subject = new RealSubject();
subject.attach(observer1);
subject.attach(observer2);
subject.setState('state 1');