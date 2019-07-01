let a = [1, 2, 3]

function proxyArr(arr) {
    return new Proxy(arr, {
        get(target, propKey, reciver) {
            let index = Number(propKey)
            if (index < 0) {
                propKey = reciver.length + index
            }
            return Reflect.get(target, propKey, reciver)
        }
    })
}

let proxyA = proxyArr(a)

console.log(proxyA[-1])