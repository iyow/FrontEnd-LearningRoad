const readline = require('readline');

// 创建逐行输入interface  输入为 连接到stdin 的流  输出为连接到stdout 的流
rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.on("line",(data)=>{
    // 获取输入 从字符串中移除前导空格、尾随空格和行终止符。用空格分割字符串
    let inputs = data.trim().split(' ');

    //处理函数
    let result = deal(inputs);

    //输出结果
    console.log(result);
    
});


function deal(inputs) {
    let result = '';

    // 数据处理

    return result;
}