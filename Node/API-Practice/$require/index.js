// 仿写一个require函数
'use strict';

// function $require(id) {
//   // 1. 先找到文件 如果文件不存在 Cannot find module './module/modu3.js'
//   // 2. 读取文件内容 内容是JS代码
//   const fs = require('fs');
//   const path = require('path');
  
//   // 要加载的JS文件路径（完整路径）
//   const filename = path.join(__dirname, id);
  
//   //dirpath\module4.js
  
//   const dirname =  path.dirname(filename);
//   //dirpath
  
//   let code = fs.readFileSync(filename, 'utf8'); // sync同步 不会进入事件队列
//   // 3. 执行代码, 所要执行的代码 需要营造一个私有空间
//   let module = { id: filename, exports: {} };
//   let exports = module.exports;
//   code =`
//   (function($require, module, exports, __dirname, __filename) { 
//     ${code} 
//   })($require, module, exports, dirname, filename);`;
  
//   eval(code);
  
//   // 4. 返回值
//   return module.exports;
// }



function $require(id) { 
  const fs = require('fs');
  const path = require('path');
  
  const filename = path.join(__dirname, id); // pathto/module1.js
  
  const dirname =  path.dirname(filename);  // pathto
  
  let code = fs.readFileSync(filename, 'utf8');
  
  // 定义一个数据容器，用容器去装模块导出的成员
  let module = { id: filename, exports: {} };
  let exports = module.exports; // module.exports
  
  code =`
  (function($require, module, exports, __dirname, __filename) { 
    ${code} 
  })($require, module, exports, dirname, filename);`;
  eval(code);
  
  return module.exports;
}



var m1 = $require('./module1.js');

m1.a.say();
m1.b.say();