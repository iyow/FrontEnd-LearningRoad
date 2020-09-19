// 暴力穷举
// 时间复杂度：这里尝试用求和公式表示  而非上界大O表示法
// i∈[0,n]，∑(n)([n-i])-------O(n^2)
var twoSum = function (nums, targnet) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target)
                return [i, j]
        }
    }
};

// x + y = target
// 两次 先构造map表 然后再查找
var twoSum2 = function (nums, target) {
    var arr = [],
        i,
        j,
        len = nums.length;

    for (i = 0; i < len; i++) {
        arr[nums[i]] = i;
    }

    for (i = 0; i < len; i++) {
        j = arr[target - nums[i]];
        if (j !== undefined && i !== j) return [i, j];
    }
}
// 一次  遍历
var twoSum = function (nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const otherIndex = map.get(target - nums[i])
        if (otherIndex !== undefined) return [otherIndex, i]
        map.set(nums[i], i)
    }
};
var twoSum = function (nums, target) {
    var temp = {};
    for (var i = 0; i < nums.length; i++) {
        var dif = target - nums[i];
        if (temp[dif] != undefined) {
            return [temp[dif], i];
        }
        temp[nums[i]] = i;
    }
};