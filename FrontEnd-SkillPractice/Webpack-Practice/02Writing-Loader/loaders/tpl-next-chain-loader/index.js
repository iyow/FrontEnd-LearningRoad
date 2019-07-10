module.exports = function (source,map){
    console.log('-------tpl---next--chanin-----这是loader')
    let result = source.replace(/[\<|\>]/g,'')
    console.log(result)
    console.log('-------tpl---next--chanin-----这是loader')
    // 保证输出模块化。loader 生成的模块与普通模块遵循相同的设计原则。
    return `module.exports = ${result}`
}