// 写一个 function，
// 它遍历一个对象数组（第一个参数）并返回一个包含相匹配的属性-值对（第二个参数）的所有对象的数组。
// 如果返回的数组中包含 source 对象的属性-值对，
// 那么此对象的每一个属性-值对都必须存在于 collection 的对象中。

function where(collection, source) {
    var arr = [];
    let count = 0;
    let keys = Object.keys(source);
    let len = keys.length;
    // What's in a name?
    collection.forEach((val) => {
        keys.forEach((key, index) => {
            if (val.hasOwnProperty(key) && val[key] === source[key]) {
                count++;
            }
        });
        if (count == len) {
            arr.push(Object.assign({}, val, source));
        }
        count = 0;
    });
    return arr;
}

where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
where([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 })