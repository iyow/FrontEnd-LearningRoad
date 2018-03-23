const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.on('line',(data)=>{
    let inputs = data.trim();

    let result = deal(inputs);

    console.log(result);
});

function deal(inputs) {
    return inputs.split("").reverse().join("");
}