// 递归遍历新AST，输出代码字符串
function codeGenerator(node) {
    switch (node.type) {
        // 根节点，把body里的所有内容都生成一遍，按行输出
        case 'Program':
            return node.body.map(codeGenerator).join('\n');

        // 表达式语句，处理其表达式内容，并添上分号
        case 'ExpressionStatement':
            return (
                codeGenerator(node.expression) + ';'
            );

        // 函数调用，添上括号，参数用逗号分隔
        case 'CallExpression':
            return (
                codeGenerator(node.callee) +
                '(' +
                node.arguments.map(codeGenerator).join(', ') +
                ')'
            );

        // 标识符，数值，原样输出
        case 'Identifier':
            return node.name;
        case 'NumberLiteral':
            return node.value;

        // 字符串，用双引号包起来再输出
        case 'StringLiteral':
            return '"' + node.value + '"';

        // 无法识别的新AST节点，报错
        default:
            throw new TypeError(node.type);
    }
}
// export default codeGenerator
module.exports = codeGenerator