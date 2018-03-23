const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let k = 2;
let inputs = [];

rl.on('line', (data) => {
    inputs.push(data.trim());

    if (k == inputs.length) {
        let result = deal(inputs);

        console.log(result);

        inputs.length = 0;
    }
});



function deal(inputs) {
    let result = [];

    let s1 = inputs[0].split("");
    let s2 = inputs[1].split("");
    let len = s1.length > s2.length ? s1.length : s2.length;
    for (let i = 0; i < len; i++) {
        if (s1[i]) {
            result.push(s1[i]);
        }
        if (s2[i]) {
            result.push(s2[s2.length - i - 1]);
        }
    }

    return result.join("");
}