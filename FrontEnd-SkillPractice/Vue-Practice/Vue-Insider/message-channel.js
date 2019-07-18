// MessageChannel
// 是一种点对点的通信方式，可以理解为管道，消息从一端进入另一端输出

// 基本使用
const mc = new MessageChannel()

mc.port1.onmessage = function (eve) {
    console.log(eve.data)
}
mc.port2.postMessage('hi jack')

// iframes之间通信

// frameA
const iframeMc = new MessageChannel()
window.parent.postMessage(1, 'http://localhost:8080', [iframeMc.port1])

// top window
window.addEventListener('message', (eve) => {
    window.frames[1].postMessage(1, 'http://localhost:8081', [eve.ports[0]])
})

// frameB
var port

window.addEventListener('message', (eve) => {
    port = eve.ports[0]
})

btn.onclick = () => {
    port.postMessage({ message: 'hi b, i am a' })
}

// deepClone
// 这个方法比较优秀的地方在于undefined的不会丢失，
// 循环引用的对象也不会报错，循环点会被置为undefined，不过不能复制函数。
function deepClone(target) {
    return new Promise(resolve => {
        const channel = new MessageChannel()
        channel.port2.postMessage(target)
        channel.port1.onmessage = eve => {
            resolve(eve.data)
        }
    })
}
const obj = {
    name: '123',
    b: {
        c: 456
    },
    d: undefined
}
deepClone(obj).then(d => console.log(d))

// 你肯以及注意到一个小细节，
// 上面的代码里面我们是先执行了postMessage，
// 再去添加onmessage监听，数据依然可以被显示。
// 推测这里应该有一个缓冲区的概念，当数据被post以后，先存在缓冲区，当onmessage监听器一旦绑定就消费这些数据。

// 验证
const verificationMc = new MessageChannel()
const { port1, port2 } = verificationMc
port1.postMessage(123)
setTimeout(() => {
    port2.onmessage = (eve) => {
        console.log('received message: ', eve.data);
    }
}, 1000);


/** 黑科技的用法就是，
 * 鉴于postMessage数据然后onmessage消费数据，
 * 这是一个异步任务，
 * vue等框架用它来模拟nextTick的行为
 */

// 用MessageChannel去做setImmediate的polyfill
// 原理是将新的message事件加入到原有的dom events之后
if (typeof MessageChannel === 'function') {
    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = nextHandler;
    port.postMessage(1);
} else {
    setTimeout(() => {
        nextHandler()
    }, 0);
}
// 回退机制
// 除了MessageChannel，
// 其他还有setTimeout、setImmediate（IE）、MutationObsever、Promise.then等等可以实现类似效果。
