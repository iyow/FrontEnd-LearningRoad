/**
 * @description compare函数
 * @param {Object} params {key,order}
 * @param {String} key 排序键
 * @param {String} order 排序方式，升序 降序[Asc|Des]
 */

// let compareFunc = order === 'Asc' ? new Function('x', 'y', 'return ((x < y) ? -1 : (x > y) ? 1 : 0)') : new Function('x', 'y', 'return ((x > y) ? -1 : (x < y) ? 1 : 0)')
// let compareStrategy = {
//     'Des': (x, y) => ((x > y) ? -1 : (x < y) ? 1 : 0),
//     'Asc': (x, y) => ((x < y) ? -1 : (x > y) ? 1 : 0)
// }
// let compareFunc = compareStrategy[order]

function compareByFunc(key = '', order = 'Des') {
    let compareFunc = order === 'Des' ?
        (x, y) => ((x > y) ? -1 : (x < y) ? 1 : 0) :
        (x, y) => ((x < y) ? -1 : (x > y) ? 1 : 0)
    let get = key ? x => getByPath(x, key) : x => x
    return function (a, b) {
        var x = get(a)
        var y = get(b)
        return compareFunc(x, y)
    }
}
function getByPath(item, path, defalt = '') {
    let pathArr = path.split('.')
    let value = defalt
    for (let i = 0, len = pathArr.length; i < len; i++) {
        value = item[pathArr[i]]
    }
    return value
}

let a = [6, 89, 33, 221, 1]
let b = [{ 'a': 6 }, { 'a': 89 }, { 'a': 33 }, { 'a': 221 }, { 'a': 1 }]

a.sort(compareByFunc())
b.sort(compareByFunc('a'))
console.log(a)
console.log(b)