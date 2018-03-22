// import { readlink } from 'fs';
// import { createInterface } from 'readline';

const fs = require('fs');
const readLine = require('readline');
const path = require('path');


let filePath = path.join(__dirname,'./Take me to your heart.lrc');

// fs.readFile('./Take me to your heart.lrc', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }

//     console.log(data);
// });

let streamRead = fs.createReadStream(filePath);
let rl = readLine.createInterface({ input: streamRead });
let begin = new Date().getTime();
let reg = /\[(\d{2}):(\d{2})\.(\d+)\](.+)/
rl.on('line', (line) => {
    let matches = reg.exec(line);
    if (matches) {
        let m = parseFloat(matches[1]);
        let s = parseFloat(matches[2]);
        let ms = parseFloat(matches[3]);
        let time_delay = m*60*1000 + s*1000 + ms;
        let lyric = matches[4];

        let offset = new Date().getTime() - begin;
        setTimeout(() => {
            console.log(lyric);
        }, time_delay-offset);
    } else {
        console.log(line);
    }
}).on('close',()=>{
    console.log('歌词加载完毕');
})