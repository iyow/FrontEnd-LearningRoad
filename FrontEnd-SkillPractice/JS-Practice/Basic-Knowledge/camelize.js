// 分隔符转驼峰命名

function camelize(str, separator = "_") {
    let camelizeRE = new RegExp(`${separator}(/\w)`, 'g')
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    })
}
//ab-cd-ef ==> abCdEf
console.log(camelize('ab-cd-ef', '-'))
// 驼峰转分隔符命名
let hyphenateRE = /\B([A-Z])/g;
function hyphenate(str, separator = "_") {
    return str.replace(hyphenateRE, `${separator}$1`).toLowerCase()
}
console.log(camelize('abCdEf', '-'))
