// 比较两个数组，然后返回一个新数组，
// 该数组的元素为两个给定数组中所有独有的数组元素。
// 换言之，返回两个数组的差异。
function diff(arr1, arr2) {
    var newArr = [];
    let combine = [...new Set([...arr1, ...arr2])];
    console.log(combine)
    combine.forEach((val) => {
        console.log('---', val)
        if (!(arr1.includes(val) && arr2.includes(val))) {
            newArr.push(val);
        }
    });
    console.log(newArr)
    return newArr;
}
function diff(arr1, arr2) {
    var newArr = [];
    let combine = [...new Set([...arr1, ...arr2])];
    newArr = combine.filter(val => !(arr1.includes(val) && arr2.includes(val)));
    console.log(newArr)
    return newArr;
}

diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);
diff([1, "calf", 3, "piglet"], [1, "calf", 3, 4]);
diff([], ["snuffleupagus", "cookie monster", "elmo"]);