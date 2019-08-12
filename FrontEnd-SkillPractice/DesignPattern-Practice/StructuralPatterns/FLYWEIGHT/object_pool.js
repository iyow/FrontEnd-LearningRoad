// 对象池维
// 护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。
// 如果对象池里没有空闲对象，则创建一个新的对象，
// 当获取出的对象完成它的职责之后， 再进入池子等待被下次获取。

// 使用的是共享的技术，但并不是一个纯粹的享元模式。
let getEnv = () => {
    return typeof window === 'object' ? 'browser' : 'node';
}

var objectPoolFactory = function (createObjFn) {
    var objectPool = [];
    return {
        create: function () {
            var obj = objectPool.length === 0 ?
                createObjFn.apply(this, arguments) : objectPool.shift();
            return obj;
        },
        recover: function (obj) {
            objectPool.push(obj);
        }
    }
};

function MyNode() {
    console.log('------创建新对象')
    let div = null
    if (getEnv() === 'browser') {
        div = document.createElement('div'); // 创建一个 dom
        document.body.appendChild(div);
    } else {
        div = {
            nodeType: 1,
            tagName: 'div',
            childNodes: [],
            innerHTML: ''
        }
    }
    return div;
}

let NodePool = objectPoolFactory(MyNode)

let node1 = NodePool.create()
let node2 = NodePool.create()
let node3 = NodePool.create()

// 使用完后 回收
NodePool.recover(node2)
NodePool.recover(node3)

setTimeout(() => {
    let node4 = NodePool.create()
    let node5 = NodePool.create()
    console.log(node4 === node2)
    console.log(node5 === node3)
}, 3000);