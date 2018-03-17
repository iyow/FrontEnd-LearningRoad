

/**
 * 同步的方式获取数据
 */
function getUser() {
  // 模拟耗时操作
  for (var i = 0; i < 1000000000; i++) { }
  return { name: '赵小黑' };
}

/**
 * 异步的回调的方式获取数据
 */
function getUserAsync(callback) {
  // 既然有可能耗时，那就一边呆着去，有空再来
  // 先挑简单的来做，大头放后面
  setTimeout(function () {
    // 模拟耗时操作
    for (var i = 0; i < 1000000000; i++) { }
    callback({ name: '赵小黑' });
  }, 0);
}


// console.time('sync');
// var user = getUser();
// console.log(user);
// console.timeEnd('sync');


console.time('async');
getUserAsync(function (user) {
  console.log(user);
});
console.timeEnd('async');