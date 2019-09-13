// collator这个单词意思是排序器。Intl.Collator对象是排序器的构造函数，可以支持对语言敏感的字符串比较。

// 数字字符串排列
let originSort = ['15', '2', '100'].sort();
let intlSort = ['15', '2', '100'].sort(new Intl.Collator(undefined, { numeric: true }).compare);
console.log('-------------数字字符串排序')
console.log(originSort)
console.log(intlSort)

// 中文的排序   拼音+声调
let arrUsername = ['成啊', '成吧', '成成', '簸箕', '博啊', '波啊', '巴基', '波波', '啊撒'];
let originSortZh = arrUsername.sort();
let intlSortZh = arrUsername.sort(new Intl.Collator('zh').compare);
console.log('-------------中文的排序平拼音排序')
console.log(originSortZh)
console.log(intlSortZh)