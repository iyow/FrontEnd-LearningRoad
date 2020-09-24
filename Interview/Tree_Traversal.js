// 树的遍历

// 深度优先遍历 dfs
// 通过 指针+树节点访问次数 标记，实现 通用 深度优先遍历 并使用visitor模式动态回调
const original = {
    dfsTravel(visitor) {
        let nodestack = []
        let point = null
        // let flag = Symbol('timeflag')
        let flag = 'timeflag'
        nodestack.push(this.tree)
        while (nodestack.length > 0) {
            point = nodestack[nodestack.length - 1]
            if (point) {
                if (!point[flag]) {
                    point[flag] = 1
                }
                visitor && visitor(point[flag], point)
                switch (point[flag]) {
                    case 1:
                        nodestack.push(point.LNode)
                        break;
                    case 2:
                        nodestack.push(point.RNode)
                        break;
                    case 3:
                        // delete point[flag]
                        nodestack.pop()
                        let parent = nodestack[nodestack.length - 1]
                        parent && parent[flag]++
                        break;
                }
            } else {
                nodestack.pop()
                let parent = nodestack[nodestack.length - 1]
                parent && parent[flag]++
            }
        }
    },
    // visitor 使用代理 调用
    obDFST(visitor) {
        let nodestack = []
        let point = null
        let flag = Symbol('timeflag')
        // let flag = 'timeflag'
        nodestack.push(this.tree)
        // point = this.tree
        while (nodestack.length > 0) {
            point = nodestack[nodestack.length - 1]
            if (point) {
                if (!point[flag]) {
                    let value = 0
                    Object.defineProperty(point, flag, {
                        get() {
                            return value
                        },
                        set(newValue) {
                            value = newValue
                            console.log('----次数', value, '---节点', this.value)
                            visitor && visitor(value, this)
                        }
                    })
                    point[flag] = 1
                }
                // 可以直接在这里判断是否有child直接++  即可去除 else
                if (!point.LNode) {
                    point[flag]++
                    if (!point.RNode) {
                        point[flag]++
                    }
                }
                switch (point[flag]) {
                    case 1:
                        nodestack.push(point.LNode)
                        break;
                    case 2:
                        nodestack.push(point.RNode)

                        break;
                    case 3:
                        // delete point[flag]
                        nodestack.pop()
                        let parent = nodestack[nodestack.length - 1]
                        parent && parent[flag]++
                        break;
                }
            }
        }
    },
}


class Node {
    constructor(value, { LNode = null, RNode = null } = {}) {
        this.LNode = LNode
        this.RNode = RNode
        this.value = value
    }
}
class Tree {
    constructor(root) {
        this.tree = root
    }
    bfsTravel() {
        let node = this.tree
        let res = [];
        let queue = [];
        queue.push(node);
        while (queue.length) {
            node = queue.shift();
            res.push(node.value);
            node.LNode && queue.push(node.LNode);
            node.RNode && queue.push(node.RNode);
        }
        return res;
    }
    dfsTravel(visitor) {
        original.obDFST.bind(this)(visitor)
        // original.dfsTravel.bind(this)(visitor)
    }
    pTravel() {
        let root = this.tree
        let nodestack = []
        let res = []
        if (!root) {
            return [];
        }
        nodestack.push(root)
        while (nodestack.length > 0) {
            let node = nodestack.pop()
            res.push(node.value)

            node.RNode && nodestack.push(node.RNode)
            node.LNode && nodestack.push(node.LNode)

        }
        return res
    }
    mTravel() {
        let root = this.tree
        let nodestack = [];
        let res = [];
        if (!root) {
            return [];
        }
        while (root !== null || nodestack.length > 0) {
            while (root !== null) {
                nodestack.push(root);
                root = root.LNode;
            }
            root = nodestack.pop();
            res.push(root.value);
            root = root.RNode;
            // ------
            // if (node) {
            //     stack.push(node);
            //     node = node.left;
            // } else {
            //     node = stack.pop();
            //     result.push(node.value);
            //     //node.right && stack.push(node.right);
            //     node = node.right; // 如果没有右子树 会再次向栈中取一个结点即双亲结点
            // }
        }
        return res
    }
    lTravel() {
        let t = this.tree

        if (!t) {
            return [];
        }
        let nodestack = []
        let res = []
        nodestack.push(t)
        while (nodestack.length > 0) {
            let node = nodestack.pop();
            res.unshift(node.value);

            node.LNode && nodestack.push(node.LNode);
            node.RNode && nodestack.push(node.RNode);

        }
        return res
    }
}
// -------------------------------------------
let tNodeLink = new Node(1, { LNode: new Node(2, { LNode: new Node(3), RNode: new Node(4) }), RNode: new Node(5) })
let mytree = new Tree(tNodeLink)
let p = []
let m = []
let l = []
console.time('dfs---visitor')
mytree.dfsTravel((time, node) => {
    let v = node.value
    // console.log('访问次数', time, '节点值', node.value)
    switch (time) {
        case 1:
            p.push(v)
            break;
        case 2:
            m.push(v)
            break;
        case 3:
            l.push(v)
            break;
    }
})
console.timeEnd('dfs---visitor')
console.log(p)
console.log(m)
console.log(l)
console.log(mytree)

// -------------------------------------------
// 前序遍历
console.time('pp')
console.log(mytree.pTravel())
console.timeEnd('pp')
// 中序遍历
console.time('mm')
console.log(mytree.mTravel())
console.timeEnd('mm')
// 后续遍历
console.time('ll')
console.log(mytree.lTravel())
console.timeEnd('ll')


// 广度优先遍历 bfs
console.time('bfs')
console.log(mytree.bfsTravel())
console.timeEnd('bfs')