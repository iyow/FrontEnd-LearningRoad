const tokenizer = require('./01-tokenizer');
const parser = require('./02-parser');
const traverser = require('./03.1-traverser-helper');
const transformer = require('./03.2-transformer');
const codeGenerator = require('./04-code-generator');

function compiler(input) {
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);

    return output;
}
module.exports = {
    tokenizer,
    parser,
    traverser,
    transformer,
    codeGenerator,
    compiler,
};