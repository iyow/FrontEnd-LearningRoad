// 函数节流

// 应用场景
// 函数节流有哪些应用场景？哪些时候我们需要间隔一定时间触发回调来控制函数调用频率？
// DOM 元素的拖拽功能实现（mousemove）
// 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
// 计算鼠标移动的距离（mousemove）
// Canvas 模拟画板功能（mousemove）
// 搜索联想（keyup）
// 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，
// 只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次


// 函数节流的核心是让一个函数不要执行得太频繁，减少一些过快的调用  来节流。

// 闭包
/*
节流函数
@param fn function
@param wait number
@param maxTimeLong number
@return function
*/
function throttling(fn, wait, maxTimelong) {
    var timeout = null,
        startTime = Date.parse(new Date);

    return function () {
        if (timeout !== null) clearTimeout(timeout);
        var curTime = Date.parse(new Date);
        if (curTime - startTime >= maxTimelong) {
            fn();
            startTime = curTime;
        } else {
            timeout = setTimeout(fn, wait);
        }
    }
}

function handle() {
    console.log(Math.random());
}

window.addEventListener('scroll', throttling(handle, 300, 1000));

// 非闭包：
var timeout = null,
    startTime = Date.parse(new Date); // 开始时间

function handle() {
    console.log(Math.random());
}

window.addEventListener('scroll', function () {
    if (timeout !== null) clearTimeout(timeout);
    var curTime = Date.parse(new Date); // 当前时间
    if (curTime - startTime >= 1000) { // 时间差>=1秒直接执行
        handle();
        startTime = curTime;
    } else { // 否则延时执行，像滚动了一下，差值<1秒的那种也要执行
        timeout = setTimeout(handle, 300);
    }
});



// underscore 函数节流实现分析
// https://github.com/hanzichi/underscore-analysis/issues/22