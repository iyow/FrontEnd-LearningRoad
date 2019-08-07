function thisIsADefaultModule(params) {
    console.log('this is a default module,thx to use')
}

function otherModuleOne(){
    console.log('thx to use this module thx')
}

export const MathPI = 3.1415926

let anotherObject = 'asdas'
export {
    thisIsADefaultModule as default,
    otherModuleOne
}

export {
    anotherObject
}


// --------------------
// export {
//     otherModuleOne
// }
// export default thisIsADefaultModule