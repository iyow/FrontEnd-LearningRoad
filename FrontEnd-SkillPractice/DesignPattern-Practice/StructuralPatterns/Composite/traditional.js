class Component {
    constructor() {
        console.log('Component Class created');
    }

    operation() {
        console.log('Component.operation invoked');
    }

    add(Component) {
        console.log('Component.add invoked');
    }

    remove(Component) {
        console.log('Component.remove invoked');
    }

    getChild(key) {
        console.log('Component.getChild invoked');
    }
}

class Leaf extends Component {
    constructor(name) {
        super();
        this.name = name;
        console.log('Leaf Class created');
    }

    operation() {
        console.log('Leaf.operation invoked');
        console.log(this.name);
    }
}

class Composite extends Component {
    constructor(name) {
        super();
        this.name = name;
        this.children = [];
        console.log('Composite Class created');
    }

    operation() {
        console.log('Composite operation for: ' + this.name)
        for (var i in this.children) {
            this.children[i].operation();
        }
    }

    add(Component) {
        console.log('Composite.add invoked');
        this.children.push(Component);
    }

    remove(Component) {
        console.log('Composite.remove invoked');
        for (var i in this.children) {
            if (this.children[i] === Component) {
                this.children.splice(i, 1);
            }
        }
    }

    getChild(key) {
        console.log('Composite.getChild invoked');
        return this.children[key];
    }
}

// 组合形成一种树形结构
// 但叶节点和父节点  并非父子关系
// 组合模式是一种 HAS-A（聚合）的关系，而不是 IS-A。组合对象包含一组叶对象，但 Leaf
// 并不是 Composite 的子类。组合对象把请求委托给它所包含的所有叶对象，它们能够合作的关键
// 是拥有相同的接口。

// 缺点
// 系统中的每个对象看起来都
// 与其他对象差不多。它们的区别只有在运行的时候会才会显现出来，这会使代码难以理解。此外，
// 如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起。
var composite1 = new Composite('C1');
composite1.add(new Leaf('L1'));
composite1.add(new Leaf('L2'));
var composite2 = new Composite('C2');
composite2.add(composite1);
composite1.getChild(1).operation();
composite2.operation();