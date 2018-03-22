// 递归目录树

// 先写一层的情况
// 抽象递归参数
// 找到突破点（避免死循环）
//   自己调自己，存在某种情况（肯定会存在的）不调用

const fs = require('fs');
const path = require('path');

// 获取当前有传入目标路径 若无输入则返回当前目录的上级目录
let inputPath = path.join(__dirname, process.argv[2] || '../');



function task(pathName, depth) {
    let filesArr = [];
    let dirsArr = [];
    let directions = fs.readdirSync(pathName);
    directions.forEach((file) => {
        let stats = fs.statSync(path.join(pathName, file));
        if (stats.isFile()) {
            filesArr.push(file);
        } else {
            dirsArr.push(file);
        }
    });

    dirsArr.forEach((dir) => {
        // depth  0 = ''
        // depth  1 = '│ '
        // depth  2 = '│ │ '

        //原始方法使用 new Array(dept+1).join('| ')
        console.log("| ".repeat(depth) + '├─' + dir);
        // 当前是一个目录 需要深入进去
        task(path.join(pathName, dir), depth + 1);
    });
    let count = filesArr.length - 1;
    filesArr.forEach((file) => {
        let temp = count-- ? '├' : '└';
        console.log(`${"| ".repeat(depth)}${temp}─${file}`);
    });

}

task(inputPath, 0);