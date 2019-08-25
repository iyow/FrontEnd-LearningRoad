// 备忘录模式
// 在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到保存的状态。
'use strict';
// 有内部状态的对象
class Originator {
    constructor() {
        console.log('Originator Class created');
        this.state = 'a';
        console.log('Originator created. State= ' + this.state);
    }

    setMemento(Memento) {
        console.log('Originator.setMemento invoked');
        this.state = Memento.getState();
        console.log('Originator.setMemento State= ' + this.state);
    }

    createMemento(state) {
        console.log('Originator.createMemento invoked');
        return new Memento(state);
    }
}
// 状态保存
class Memento {
    constructor(state) {
        console.log('Memento Class created');
        this.state = state;
        console.log('Memento created. State= ' + this.state);
    }

    getState() {
        console.log('Memento.getState invoked');
        return this.state;
    }

    setState(state) {
        console.log('Memento.setState invoked');
        this.state = state;
    }
}
// 状态的管理
class Caretaker {
    constructor() {
        console.log('Caretaker Class created');
        this.mementos = [];
    }

    addMemento(memento) {
        console.log('Caretaker.addMemento invoked');
        this.mementos.push(memento)
    }

    setMemento() {
        console.log('Caretaker.setMemento invoked');
        return this.mementos[this.mementos.length - 1]
    }
}

let caretaker = new Caretaker();
let originator = new Originator();
caretaker.addMemento(originator.createMemento('b'));
originator.setMemento(caretaker.setMemento());
console.log(originator.state);