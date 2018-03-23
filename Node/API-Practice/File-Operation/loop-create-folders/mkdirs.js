// 创建层级目录

const fs = require('fs');
const path = require('path');

// 创建文件，定义模块成员，导出模块成员，载入模块，使用模块

// function mkdirs(pathname, callback) {
//   // 1. 判断传入的是否是一个绝对路径
//   // D:\fed01\day04\code\demo2\demo3
//   // __dirname D:\fed01\day04\code
//   pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname, pathname)

//   // 获取要创建的部分
//   // pathname = pathname.replace(__dirname, '');
//   var relativepath = path.relative(__dirname, pathname);

//   // ['demo2','demo3']
//   var folders = relativepath.split(path.sep);

//   try {
//     var pre = '';
//     folders.forEach(folder => {
//       fs.mkdirSync(path.join(__dirname, pre, folder));
//       pre = path.join(pre, folder); // demo2/
//     });
//     callback && callback(null);
//   } catch (error) {
//     callback && callback(error);
//   }
// }



function mkdirs(pathname, callback) {
  // module.parent 拿到的是调用我的对象 index.js
  // 注意__dirname的路径问题  所以上面的代码有问题
  // console.log(module.parent);
  var root = path.dirname(module.parent.filename);

  pathname = path.isAbsolute(pathname) ? pathname : path.join(root, pathname)

  var relativepath = path.relative(root, pathname);

  var folders = relativepath.split(path.sep);

  try {
    var pre = '';
    folders.forEach(folder => {
      // fs.existsSync 已过时
      // try {
      //   fs.statSync(path.join(root, pre, folder));
      //   fs.mkdirSync(path.join(root, pre, folder));
      // } catch (error) {

      // }
      
      // if (!fs.existsSync(path.join(root, pre, folder))) {
      //   // 文件目录不存在
      //   fs.mkdirSync(path.join(root, pre, folder));
      // }
      try {
        // 如果文件夹不存在则报错进入
        fs.statSync(path.join(root, pre, folder));
      } catch (error) {
        fs.mkdirSync(path.join(root, pre, folder));
      }

      pre = path.join(pre, folder);
    });
    callback && callback(null);
  } catch (error) {
    callback && callback(error);
  }
}


// module.exports = { mkdirs };
module.exports = mkdirs;