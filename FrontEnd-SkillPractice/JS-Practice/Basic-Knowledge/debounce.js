// 函数防抖

// 应用场景
// 函数去抖有哪些应用场景？哪些时候对于连续的事件响应我们只需要执行一次回调？
// 每次 resize/scroll 触发统计事件
// 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）

// 添加监听事件时调用一次debounce 形成闭包并返回 函数 作为参数 并给handle  500ms函数延时
//  500ms内再次触发事件就清除上一次的延时函数重新设置定时器达到去抖效果（timeout在debounce函数作用域中一直存在）
// 其实事件的回调函数一直在被触发
// 相当于一个动作不停地被触发，但是又不停地被终止，两次触发之间的时间长于给定的时间段才会真正触发这个时间

// 函数去抖就是对于一定时间段的连续的函数调用，只让其执行一次。

// 闭包：
/*
    延时执行
    @param fn function
    @param wait number
    @return function
*/
function debounce(fn, wait) {
    console.log('dddddddd')
    var timeout = null;
    return function () {
        console.log('xixixixi')
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random());
}
// 滑轮事件
window.addEventListener('wheel', debounce(handle, 500));

// 非闭包：
var timeoutB = null;
window.addEventListener('scroll', function () {
    if (timeoutB !== null) clearTimeout(timeoutB);
    timeoutB = setTimeout(function () {
         
        var scrollTop = this.scrollY;
        console.log(scrollTop);
    }.bind(this), 500);
});

// underscore 函数去抖实现分析
// https://github.com/hanzichi/underscore-analysis/issues/21