// 缓存计算值
function memoize(fundamental, cache = {}) {
    let shell = (arg) => {
        !cache.hasOwnProperty(arg) && (cache[arg] = fundamental(arg))
        return cache[arg]
    }
    return shell
}