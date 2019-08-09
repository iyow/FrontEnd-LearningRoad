// -----------------解决CGI接口，后端接口返回的下划线字段统一获取问题-------------------
// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}


let test = {
    a_b: 123,
    c_d: 456
}
// 通用转换

const destructionProxy = (obj) => new Proxy(obj, {
    get(target, name) {
        console.log(name)
        const _name_ = toLine(name);
        return _name_ === name ? target[name] : target[_name_];
    },
});
let destructionObj = destructionProxy(test)
console.log(destructionObj)
// 服务端的数据有下划线直接解构 拦截get 
// 获取需要从对象中取值的key，驼峰转下滑线去对象中取值
let {
    a_b,
    aB,
    cD
} = destructionObj
console.log(aB, cD, a_b)