// promise的规范有很多
// Promise/A,   Promise/B,   Promise/D,  Promise/A+
// ES6采用的是Promise/A+
// google v8 3.29.45 版本的peomise实现为js(browser使用settimeout放入异步队列，，，使用C宏调用)
// 在后续的版本中google继续对其实现进行了处理 引入了es6语法，
// v8 在 7.X版本迭代后改为了C实现(C++?)

// debugger
// let promiseA = new PromiseG((resolve, reject) => {
//     setTimeout(() => {
//         console.log('---------10')
//         resolve('......10 done')
//     }, 1000)
// })

// let promiseB = new PromiseG((resolve, reject) => {
//     setTimeout(() => {
//         console.log('---------20')
//         resolve('......20 done')

//     }, 2000);
// })

// let promiseC = new PromiseG((resolve, reject) => {
//     setTimeout(() => {
//         console.log('---------30')
//         resolve('......30 done')

//     }, 3000);
// })

// promiseC.then((data) => {
//     console.log(data)
//     return data
// }).then((data) => {
//     console.log(data)
//     return data
// }).then((data) => {
//     console.log(data)
//     return data
// }).then((data) => {
//     console.log(data)
//     return data
// }).then((data) => {
//     console.log(data)
// })

// PromiseG.race([promiseA, promiseB, promiseC]).then((data) => {
//     console.log(data)
// })

// PromiseG.all([promiseA, promiseB, promiseC]).then((data) => {
//     console.log(data)
// })

/**
 * PromiseG 实现 遵循promise/A+规范
 * PromiseG/A+规范译文:
 * https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
 */

// promise 三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function PromiseG(excutor) {
    let that = this; // 缓存当前promise实例对象
    that.status = PENDING; // 初始状态
    that.value = undefined; // fulfilled状态时 返回的信息
    that.reason = undefined; // rejected状态时 拒绝的原因
    that.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
    that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

    function resolve(value) { // value成功态时接收的终值
        if (value instanceof PromiseG) {
            return value.then(resolve, reject);
        }

        // 为什么resolve 加setTimeout?
        // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
        // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。

        setTimeout(() => {
            // 调用resolve 回调对应onFulfilled函数
            if (that.status === PENDING) {
                // 只能由pedning状态 => fulfilled状态 (避免调用多次resolve reject)
                that.status = FULFILLED;
                that.value = value;
                that.onFulfilledCallbacks.forEach(cb => cb(that.value));
            }
        });
    }

    function reject(reason) { // reason失败态时接收的拒因
        setTimeout(() => {
            // 调用reject 回调对应onRejected函数
            if (that.status === PENDING) {
                // 只能由pedning状态 => rejected状态 (避免调用多次resolve reject)
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        });
    }

    // 捕获在excutor执行器中抛出的异常
    // new PromiseG((resolve, reject) => {
    //     throw new Error('error in excutor')
    // })
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
// promiseDone
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'));
    }

    let called = false; // 避免多次调用
    // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
    if (x instanceof PromiseG) { // 获得它的终值 继续resolve
        if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
            x.then(resolve, reject);
        }
        // 如果 x 为对象或者函数
    } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try { // 是否是thenable对象（具有then方法的对象/函数）
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if (called) return;
                    called = true;
                    reject(reason);
                })
            } else { // 说明是一个普通对象/函数
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
PromiseG.prototype.then = function (onFulfilled, onRejected) {
    const that = this;
    let newPromise;
    // 处理参数默认值 保证参数后续能够继续执行
    onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
        typeof onRejected === "function" ? onRejected : reason => {
            throw reason;
        };

    // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
    // 原因:
    // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
    // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

    // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
    // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

    // 如下面这种情景 多次调用p1.then
    // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
    //     console.log(value); // resolve
    //     // console.log(p1.status); // fulfilled
    //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
    //         console.log(value); // 'resolve'
    //     });
    //     console.log('当前执行栈中同步代码');
    // })
    // console.log('全局执行栈中同步代码');
    //

    if (that.status === FULFILLED) { // 成功态
        return newPromise = new PromiseG((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(that.value);
                    resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                } catch (e) {
                    reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                }
            });
        })
    }

    if (that.status === REJECTED) { // 失败态
        return newPromise = new PromiseG((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (that.status === PENDING) { // 等待态
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new PromiseG((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};

/**
 * PromiseG.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
// 透传每个promise成功后的返回值 看是否都完成
PromiseG.all = function (promises) {
    return new PromiseG((resolve, reject) => {
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}

function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function (i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}

/**
 * PromiseG.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
PromiseG.race = function (promises) {
    return new PromiseG((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(resolve, reject);
        });
    });
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
PromiseG.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

PromiseG.resolve = function (value) {
    return new PromiseG(resolve => {
        resolve(value);
    });
}

PromiseG.reject = function (reason) {
    return new PromiseG((resolve, reject) => {
        reject(reason);
    });
}


let promiseA = new PromiseG((resolve, reject) => {
    setTimeout(() => {
        console.log('---------10')
        //我的理解： 异步任务一结束  调用promise类的 resolve函数 把之前的 存好的执行步骤执行一遍(存在query里的函数)
        resolve('......10 done')
    }, 1000)
})

let promiseB = new PromiseG((resolve, reject) => {
    setTimeout(() => {
        console.log('---------20')
        resolve('......20 done')

    }, 2000);
})

let promiseC = new PromiseG((resolve, reject) => {
    setTimeout(() => {
        console.log('---------30')
        resolve('......30 done')

    }, 3000);
})

// Promise本身的确只是一个普通的类
// Promise所做的事情，是为当前这个不知道何时能完成的动作打上一些状态的标记，
// 并传入两个用于回收控制权的方法作为参数来启动执行这个匿名函数，
// 通过then方法指定的后续执行逻辑会先缓存起来（这里的描述并不严谨），
// 当这个异步动作完成后调用resolve或者reject方法后，再继续执行事先被缓存起来的流程。
// then函数  会把所有执行步骤存（管理）起来 等到resolve/reject一调用 就开始执行
promiseC.then((data) => {
    console.log(data)
    return data
}).then((data) => {
    console.log(data)
    return data
}).then((data) => {
    console.log(data)
    return data
}).then((data) => {
    console.log(data)
    return data
}).then((data) => {
    console.log(data)
})

PromiseG.race([promiseA, promiseB, promiseC]).then((data) => {
    console.log(data)
})

PromiseG.all([promiseA, promiseB, promiseC]).then((data) => {
    console.log(data)
})