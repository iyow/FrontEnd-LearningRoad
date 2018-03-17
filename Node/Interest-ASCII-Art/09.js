
/**
 * 异步的回调的方式获取数据
 */
function isOddOrEvenAsync(number, callback) {
  if (number && typeof number === 'number') {
    if (number % 2) {
      callback(null, '奇数');
    } else {
      callback(null, '偶数');
    }
  } else {
    callback(new Error('你传的不是合法参数'));
  }
}


isOddOrEvenAsync(19, function (error, msg) {
  if (error) {
    console.error(error);
    return false;
  }
  console.log(msg);
});

isOddOrEvenAsync(10, function (error, msg) {
  if (error) {
    console.error(error);
    return false;
  }
  console.log(msg);
});

isOddOrEvenAsync(0, function (error, msg) {
  if (error) {
    console.error(error);
    return false;
  }
  console.log(msg);
});

isOddOrEvenAsync('aa', function (error, msg) {
  if (error) {
    console.error(error);
    return false;
  }
  console.log(msg);
});