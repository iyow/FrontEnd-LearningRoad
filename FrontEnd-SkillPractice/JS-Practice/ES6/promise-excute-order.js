let chainFunc = (params) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(params)
        }, 500)
    });
}

let asyncFunc = async () => {
    let a = 10
    let b = 0
    let c = await (() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                b = a = 20
                resolve('yes')
            }, 2000)
        });
    })();
    console.log('aaa', a)
    console.log('bbb', b)
    console.log('ccc', c)
}
let chanin = chainFunc('im promise')
console.log('======')
asyncFunc();
chanin.then((p) => {
    console.log(p)
});