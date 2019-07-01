// 定时器优化耗时循环  问题  一般使用25毫秒延时因为再小的延时对于大多数UI更新来说不够用

function processArray(items, process, callback) {
    // 克隆原数组
    let todo = items.concat()
    setTimeout(function t() {
        process(todo.shift())
        if (todo.length > 0) {
            setTimeout(t, 25);
        } else {
            callback()
        }
    }, 25);
    // let tt = setInterval(() => {
    //     process(todo.shift())
    //     if (todo.length = 0) {
    //         clearInterval(tt)
    //         callback()
    //     }
    // }, 25);
}

function multiProcessArray(items, process, callback, processTimes = 1) {
    // 克隆原数组
    let todo = items.concat()
    setTimeout(function t() {
        let arrLength = todo.length
        let times = arrLength > processTimes ? processTimes : arrLength
        for (let index = 0; index < times; index++) {
            process(todo.shift())
        }
        if (todo.length > 0) {
            setTimeout(t, 25);
        } else {
            callback()
        }
    }, 25);
}

function timedProcessArray(items, process, callback) {
    // 克隆原数组
    let todo = items.concat()
    setTimeout(function t() {
        let start = +new Date()
        do {
            process(todo.shift())
        } while (todo.length > 0 && (+new Date() - start) < 50)
        if (todo.length > 0) {
            setTimeout(t, 25);
        } else {
            callback()
        }
    }, 25);
}

processArray([1, 2, 3], (i) => {
    console.log(i)
}, () => {
    console.log('done')
})


function multistep(steps, args, callback) {
    let tasks = steps.concat()

    setTimeout(function t() {
        let task = tasks.shift()
        task.apply(null, args || [])
        tasks.length > 0 ? setTimeout(t, 25) : callback()

    }, 25);
}
multistep([() => {
    console.log(1)
}, () => {
    console.log(2)
}, () => {
    console.log(3)
}], [], () => {
    console.log('done')
})