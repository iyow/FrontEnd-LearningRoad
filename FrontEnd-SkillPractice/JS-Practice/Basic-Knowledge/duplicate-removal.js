let objArr = [{
    "id": "a"
}, {
    "id": "b"
}, {
    "id": "a"
}];
// let reg = /\[(.*)\]/g;
// console.time("result");
// let result = reg.exec(objStr);
// console.timeEnd("result");
// let set = new Set(result[1].split(","));
// 去重
function first(arrObj) {
    let objStr = JSON.stringify(arrObj);
    let result = Array.from(new Set(objStr.slice(1, -1).split(","))).reduce((item, current) => {
        item.push(JSON.parse(current));
        return item;
    }, []);
    console.log(result);
    return result;
}

function second(arrObj, key) {
    if (!key) {
        return first(arrObj);
    }
    let result = [];
    let hash = {};
    arrObj.forEach((item) => {
        hash[item[key]] ? "" : hash[item[key]] = true && result.push(item);
    });
    return result;
}




function third(arrObj, key) {
    if (!key) {
        return first(arrObj);
    }
    let hash = {};
    let result = arrObj.reduce((item, current, index, initalArr) => {
        hash[current[key]] ? "" : hash[current[key]] = true && item.push(current);
        return item;
    }, []);
    console.log(result);
    return result;
}




function test() {
    // var myMap = new Map();
    // myMap.set(1, "a");
    // myMap.set({
    //     "a": "123"
    // }, "b");
    // myMap.set({
    //     "a": "123"
    // }, "c");
    // console.log("size=" + myMap.size);
    // console.log(myMap.get(1));

    var reg = /\[(.*)\]/g;

    var obj = [{
        "id": "a"
    }, {
        "id": "b"
    }, {
        "id": "a"
    }];
    var objStr = JSON.stringify(obj);

    console.time("result");
    var result = reg.exec(objStr);
    console.timeEnd("result");

    console.time("result2");
    var result2 = objStr.slice(1, -1);
    console.timeEnd("result2");



    var set = new Set(result[1].split(","));
    var set2 = new Set(result2.split(","));
    console.log(set);
    console.log(set2);
}



// console.time("first");
// first(objArr);
// console.timeEnd("first");
// console.time("second");
// second(objArr, "id");
// console.timeEnd("second");
// console.time("third");
// third(objArr, "id");
// console.timeEnd("third");


test();