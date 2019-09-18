// 使用数组对应 缓解 多层ifelse嵌套和消息统一处理
function ifElseOpt(item) {
    // 这里的条件可以更加复杂
    // 并且 按照 优先级顺序 排列在fuckReturn中  进而缓解if(if(if)) 这一情况
    let hasA = () => item.hasOwnProperty('a')
    let hasB = () => item.hasOwnProperty('b')
    let hasC = () => item.hasOwnProperty('c')
    let fuckReturn = [hasA, hasB, hasC]
    let returnType = fuckReturn.findIndex(f => f())
    if (returnType >= 0) {
        let returnMsgs = ['', '请勿重复选择哦', '无法获取该联系人信息']
        let msg = returnMsgs[returnType]
        // 为空不进行操作
        // 也可以再次做统一的message提示
        msg && console.error(new Error(msg))
    } else {
        // do something other
        console.log(item)
    }
}

// test
ifElseOpt({ a: 1 })
ifElseOpt({ b: 1 })
ifElseOpt({ c: 1 })
ifElseOpt({ d: 1 })
