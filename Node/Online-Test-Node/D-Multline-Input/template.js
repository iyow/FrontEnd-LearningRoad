const readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let k = 1;    //输入K行（分组输入，一组有几行）
let inputs = [];

rl.on('line', (data) => {

    //获取数据存入数组
    inputs.push(data.trim());

    //当输入的数据的行数达到要求时，即每次输入完一组数据进行处理
    if (k == inputs.length) {
        // 处理
        let result = deal(inputs);

        //输出结果
        console.log(result);

        //每组结束将数组清零 
        inputs.length = 0;
    }
});



function deal(inputs) {
    let result = '';

    // 数据处理

    return result;
}