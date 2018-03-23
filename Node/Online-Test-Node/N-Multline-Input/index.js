const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let num = 0;
let inputs = [];

rl.on('line', (data) => {
    if (num == 0) {
        num = Number(data.trim());
    } else {
        inputs.push(parseInt(data.trim()));

        if (num == inputs.length) {

            let result = deal(inputs);


            console.log(result);

            num = 0;
            inputs.length = 0;
        }
    }
});


function deal(inputs) {
    inputs.sort((a, b) => {
        return a - b;
    });

    let len = inputs.length;
    let result = 0;
    let mid = 0;
    if (len % 2 === 0) {
        mid = len / 2;
        result = Math.floor(inputs[mid] + inputs[mid - 1]);
    }else{
        mid = (len-1)/2;
        result = inputs[mid];
    }


    return result;

}