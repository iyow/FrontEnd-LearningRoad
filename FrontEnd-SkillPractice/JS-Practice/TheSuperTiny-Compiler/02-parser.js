// 根据token数组生成原始的AST树
function parser(tokens) {
    // 当前正在处理的token索引
    let current = 0;

    // 递归遍历（因为函数调用允许嵌套），把token转成AST节点
    // 这里  有点  先序遍历二叉树还原的感觉
    function walk() {
        let token = tokens[current];

        // 数值
        if (token.type === 'number') {
            current++;

            // 生成一个AST节点，表示数值字面量
            return {
                type: 'NumberLiteral',
                value: token.value,
            };
        }

        // 字符串
        if (token.type === 'string') {
            current++;

            return {
                type: 'StringLiteral',
                value: token.value,
            };
        }

        // 函数调用
        if (
            token.type === 'paren' &&
            token.value === '('
        ) {
            // 丢掉左括号，取下一个token作为函数名
            token = tokens[++current];

            let node = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            };

            // 看下一个token
            token = tokens[++current];

            // 右括号之前的所有token解析完都是参数
            while (
                (token.type !== 'paren') ||
                (token.type === 'paren' && token.value !== ')')
            ) {
                node.params.push(walk());
                token = tokens[current];
            }
            // 吃掉右括号
            current++;

            return node;
        }

        // 无法识别的token，报错
        throw new TypeError(token.type);
    }

    // AST的根节点
    let ast = {
        type: 'Program',
        body: [],
    };
    // 填充ast.body，允许多条语句，所以放循环里
    while (current < tokens.length) {
        ast.body.push(walk());
    }
    return ast;
}


// console.log(parser([
//     { type: 'paren', value: '(' },
//     { type: 'name', value: 'add' },
//     { type: 'number', value: '2' },
//     { type: 'paren', value: '(' },
//     { type: 'name', value: 'subtract' },
//     { type: 'number', value: '4' },
//     { type: 'number', value: '2' },
//     { type: 'paren', value: ')' },
//     { type: 'paren', value: ')' },]
// ))
// export default parser
module.exports = parser