function readSome(a, b) {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve(a + b)
            console.log(a + b)
        }, 2000)
    })
}
// 自执行函数
function spawn(genFn) {
    return new Promise(function (resolve, reject) {
        const fnIterator = genFn();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            // next.value.then((v) => {
            //     step(function () { return fnIterator.next(v); });
            // }, (e) => {
            //     step(function () { return fnIterator.throw(e); });
            // })
            Promise.resolve(next.value).then(function (v) {
                step(function () { return fnIterator.next(v); });
            }, function (e) {
                step(function () { return fnIterator.throw(e); });
            });
        }
        step(function () { return fnIterator.next(undefined); });
    });
}

async function runAsync(args) {
    let r1 = await readSome('hello   ', 'result 111')
    console.log('=runAsync======嘿嘿嘿😜', r1)
    console.log(new Date())
    let r2 = await readSome('hello   ', 'result 222')
    console.log('=runAsync======嘿嘿嘿😜', r2)
    console.log(new Date())
    return r1 + r2
}

// 等同于

function runSpawn(args) {
    return spawn(function* () {
        let r1 = yield readSome('hello   ', 'result 111')
        console.log('runSpawn=======嘿嘿嘿😜', r1)
        console.log(new Date())
        let r2 = yield readSome('hello   ', 'result 222')
        console.log('runSpawn=======嘿嘿嘿😜', r2)
        console.log(new Date())

        return r1 + r2
    });
}


runAsync()
runSpawn()


// Promise.resolve(new Promise(resolve => {
//     setTimeout(() => {
//         resolve(2)
//         console.log('=2miaohoushuchu hahh ahh ah ah')
//     }, 2000)
// })).then(r => {
//     console.log('====daan', r)
// })