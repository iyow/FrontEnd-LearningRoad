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