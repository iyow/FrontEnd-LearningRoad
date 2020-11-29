// tagged template 标签模板
function fn(string, substitute) {
    console.log(string)
    console.log(substitute)
    console.log(arguments)
    if (substitute === 'ES6') {
        substitute = 'ES2015'
    }
    return substitute + string[1];
}

const version = 'ES6';
const params = 'second 模板 params'
const result = fn`${version} was a major update${params}`;


String.prototype.interpolate = function (params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    console.log(names)
    console.log(vals)
    return new Function(...names, `return \`${this}\`;`)(...vals);
}
let R = '${a}原文本使用es6的模板字符串${b}'.interpolate({ a: '通过参数插值', b: '实现技巧' });
console.log(R)