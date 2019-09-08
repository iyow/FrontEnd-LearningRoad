
// 为了要遍历我们的AST，我们要先写一个helper function 
// 递归遍历AST结构，遍历过程中通知visitor

// Transform 的工作就是由visitor 完成的，这里先不要急，
// 到transform这个函数时就会看到visitor是如何作用的。
function traverser(ast, visitor) {
    // 遍历AST节点数组
    function traverseArray(array, parent) {
        array.forEach(child => {
            traverseNode(child, parent);
        });
    }

    function traverseNode(node, parent) {
        // 从visitor取出对应的一组方法
        let methods = visitor[node.type];
        // 通知visitor我们正在访问node
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        switch (node.type) {
            // 根节点
            case 'Program':
                traverseArray(node.body, node);
                break;
            // 函数调用
            case 'CallExpression':
                traverseArray(node.params, node);
                break;
            // 数值和字符串，没孩子，不用处理
            case 'NumberLiteral':
            case 'StringLiteral':
                break;

            // 无法识别的AST节点，报错
            default:
                throw new TypeError(node.type);
        }

        // 通知visitor我们要离开node了
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    // 开始遍历
    traverseNode(ast, null);
}
// export default traverser
module.exports = traverser