const traverser = require('./03.1-traverser-helper')
// 根据原始AST树 转换为 目标AST树
// 输入Lisp AST，输出C AST
// 用额外的数据结构维持新旧AST的联系
// let stack = [newAst.body];
// function peak() {
//     return stack[stack.length - 1];
// }
function transformer(ast) {
    // 新AST的根节点
    let newAst = {
        type: 'Program',
        body: [],
    };

    // 偷懒以简单粗暴的方式维持新旧AST的联系，方便在遍历过程中操作新AST
    ast._context = newAst.body;

    // 创建vistor，开始遍历
    traverser(ast, {
        // 数值和字符串，直接原样插入新AST
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value,
                });
            },
        },

        // 函数调用
        CallExpression: {
            enter(node, parent) {
                // 创建不同的AST节点
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                };

                // 函数调用可以有孩子，建立节点对应关系，供子节点使用
                node._context = expression.arguments;

                // 顶层函数调用算是语句，包装成特殊的AST节点
                if (parent.type !== 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression,
                    };
                }

                parent._context.push(expression);
            },
        }
    });

    return newAst;
}
// export default transformer
module.exports = transformer