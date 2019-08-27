const { transform } = require('@babel/core');

const fs = require('fs');

//读取需要转换的js字符串
const before = fs.readFileSync('./before.js', 'utf8');

//使用babel-core的transform API 和插件进行字符串->AST转化。
const res = transform(`${before}`, {
  plugins: [require('./plugin')]
});

// 存在after.js删除
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');
// 写入转化后的结果到after.js
fs.writeFileSync('./after.js', res.code, 'utf8');

// 直接用 babel-cli
// 配置文件.babelrc
// babel-cli工具自带一个babel-node命令
// 使用babel-node替代node，这样script.js本身就不用做任何转码处理。

// 只需要引入文件就可以运行 Babel
// babel-register模块改写require命令，为它加上一个钩子。
// 此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，
// 就会先用Babel进行转码。
// babel-register

// 以编程的方式来使用 Babel
// babel-core