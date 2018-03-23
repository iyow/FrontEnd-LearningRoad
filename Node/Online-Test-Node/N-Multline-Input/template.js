const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let inputs = [];

let num = 0;    //第一行输入数字n，为需要输入的行数

rl.on('line', (data) => {
    //若为第一次输入 获取到需要输入的行数
    if (num == 0) {
        num = Number(data.trim());
    } else {
        //存储数据
        inputs.push(data.trim());

        //当输入的数组长度(输入行数) 等于第一行输入的num值时进行处理
        if (num == inputs.length) {

            //处理函数
            let result = deal(inputs);

            //输出结果
            console.log(result);


            //将数组清零标记清零  ， 下一组便可再次输入
            inputs.length = 0;
            num = 0;
        }
    }
});

function deal(inputs) {
    let result = '';

    // 数据处理


    return result;
}