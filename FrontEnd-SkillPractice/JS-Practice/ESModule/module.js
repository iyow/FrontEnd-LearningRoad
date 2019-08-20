function thisIsADefaultModule(params) {
    console.log('this is a default module,thx to use')
}

function otherModuleOne() {
    console.log('thx to use this module thx')
}

class MyClass {
    constructor() {
    }
}
export const MathPI = 3.1415926

let anotherObject = 'asdas'
export {
    thisIsADefaultModule as default,
    otherModuleOne
}

export {
    anotherObject,
    MyClass
}


// --------------------
// 分模块导出
// export {
//     otherModuleOne,
//     MyClass
// }
// 默认导出
// export default thisIsADefaultModule
// 分模块导出和默认导出 合并
// export {
//     thisIsADefaultModule as default,
//     otherModuleOne,
//     MyClass
// }