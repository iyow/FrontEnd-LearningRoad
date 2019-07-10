// 根据字符串路径获取对象属性

function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1'); //将[0]转化为.0
    path = path.replace(/^\./, ''); //去除开头的.

    let keyArr = path.split('.'); //根据.切割
    // ... todo
};