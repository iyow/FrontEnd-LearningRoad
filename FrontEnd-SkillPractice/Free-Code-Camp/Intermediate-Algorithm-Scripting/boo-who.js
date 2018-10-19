// 检查一个值是否是基本布尔类型，并返回 true 或 false。
// 基本布尔类型即 true 和 false。

function boo(bool) {
    // What is the new fad diet for ghost developers? The Boolean.
    // return typeof bool === 'boolean';
    // return bool===true||bool===false;
    return bool === !!bool;
    // return Object.prototype.toString.call(bool) === '[object Boolean]';

}

boo(null);
boo(NaN)
boo([].slice)
boo("true")
boo(true)