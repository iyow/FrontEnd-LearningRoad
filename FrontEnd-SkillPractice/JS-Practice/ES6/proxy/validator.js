function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
let validator = {
    get: function (target, propKey, reciver) {
        invariant(propKey, 'get')
        // if (Reflect.has(target, propKey) && typeof propKey === 'symbol') {
        //     throw new Error(`Invalid attempt to get private "${propKey.toString()}" property`);
        // }
        return Reflect.get(target, propKey, reciver)
    },
    set: function (target, propKey, value, reciver) {
        invariant(propKey, 'set')
        if (propKey === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        return Reflect.set(target, propKey, value, reciver)
    },
    // 拦截以下操作
    // Object.getOwnPropertyNames()
    // Object.getOwnPropertySymbols()
    // Object.keys()
    // for...in循环
    ownKeys(target) {
        // return ['someKey1','someKey2'];
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
}

let person = new Proxy({
    _private: 'private'
}, validator)

try {
    // person.age = 1.2
    // person._private = 'kexi'
    console.log(person._private)
} catch (e) {
    console.log(e)
}


person.age = 12
console.log(person)