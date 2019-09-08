const {
    tokenizer,
    parser,
    transformer,
    codeGenerator,
    compiler,
} = require('./compiler.js');
// node 的 assert模块提供了一组用于验证不变量的断言函数。
// DOC:https://nodejs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message
const assert = require('assert');

const input = '(add 2 (subtract 4 2))';
const output = 'add(2, subtract(4, 2));';

const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' }
];

const ast = {
    type: 'Program',
    body: [{
        type: 'CallExpression',
        name: 'add',
        params: [{
            type: 'NumberLiteral',
            value: '2'
        }, {
            type: 'CallExpression',
            name: 'subtract',
            params: [{
                type: 'NumberLiteral',
                value: '4'
            }, {
                type: 'NumberLiteral',
                value: '2'
            }]
        }]
    }]
};

const newAst = {
    type: 'Program',
    body: [{
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: 'add'
            },
            arguments: [{
                type: 'NumberLiteral',
                value: '2'
            }, {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'subtract'
                },
                arguments: [{
                    type: 'NumberLiteral',
                    value: '4'
                }, {
                    type: 'NumberLiteral',
                    value: '2'
                }]
            }]
        }
    }]
};


assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer should turn `input` string into `tokens` array');
console.log('词法模块通过')
assert.deepStrictEqual(parser(tokens), ast, 'Parser should turn `tokens` array into `ast`');
console.log('语法树生成模块通过')
assert.deepStrictEqual(transformer(ast), newAst, 'Transformer should turn `ast` into a `newAst`');
console.log('原始AST-->目标AST转换模块通过')
assert.deepStrictEqual(codeGenerator(newAst), output, 'Code Generator should turn `newAst` into `output` string');
console.log('目标代码生成模块通过')
assert.deepStrictEqual(compiler(input), output, 'Compiler should turn `input` into `output`');
console.log('集成通过')
console.log('All Passed!');