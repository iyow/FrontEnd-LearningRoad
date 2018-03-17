
process.stdout.write(`请输入用户名\n`);
var userId = '';
let users = {
    'user1': '123',
    'user2': '456'
};
process.stdin.on('data', (input) => {
    input = input.toString().trim();
    var usersID = Object.keys(users);
    if (!userId) {
        // console.log(input);
        if (usersID.indexOf(input) === -1) {
            userId = '';
            process.stdout.write(`输入错误\n`);
            process.stdout.write(`找不到${input}用户，请重新输入用户名\n`);
        } else {
            userId = input;
            process.stdout.write(`${userId}你好，请输入密码\n`);
        }
    } else {
        // console.log(input);
        // console.log(userId);
        // console.log(typeof users[userId]);
        // console.log(typeof input);
            if (input === users[userId]) {
            process.stdout.write(`欢迎${userId}登陆成功`);
            userId = '';
        } else {
            process.stdout.write(`密码错误，请再次输入密码\n`);
        }
    }
});



// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });




// var users = {
//     'admin': '123',
//     'user1': '321',
//     'user2': '213'
//   };
  
  
//   // 输出第一个问题
//   process.stdout.write('请输入用户名：\n');
  
//   // var i = 0;
//   var isInputUsername = true;
//   var username = '';
  
//   // 接收用户输入
//   process.stdin.on('data', (input) => {
  
//     // console.log(i++);
//     // 要在此处知道到底input是啥？
  
//     input = input.toString().trim();
  
//     if (!username) {
//       if (Object.keys(users).indexOf(input) === -1) {
  
//         process.stdout.write('用户名不存在' + '\n');
//         process.stdout.write('请输入用户名：\n');
//         // isInputUsername = true;
//         username = '';
  
//       } else {
  
//         // console.log('存在');
//         process.stdout.write('请输入密码：\n');
//         // isInputUsername = false;
//         username = input;
  
//       }
//     } else {
//       // 传入的是密码，此处拿不到上次的输入，所以拿不到用户名
//       // console.log(11111);
//       if (input === users[username]) {
//         console.log('登陆成功');
//       }else{
//         process.stdout.write('请输入密码：\n');
//       }
//     }
//   });
  
  
  
  // // 接收用户输入
  // // var  res =  process.stdin.readline(); // 用户的操作无状态
  // process.stdin.on('data', (input) => {
  //   // process.stdout.write(typeof input);
  //   // input实际上是一个流（二进制数组）
  //   // 输入的字符最后肯定是一个回车符
  //   input = input.toString().trim();
  //   // process.stdout.write(`*${input}*`);
  //   // 获取一个键值对集合中所有的键
  //   if (Object.keys(users).indexOf(input) === -1) {
  //     // 用户名不存在
  //     process.stdout.write('用户名不存在' + '\n');
  //     process.stdout.write(q + '\n');
  //   } else {
  //     // 存在
  //     // var pwd = users[input];
  //     console.log('存在');
  //   }
  // });
  
  
  
  // // 当前命令行中后回车符出现 触发
  // process.stdin.on('data', (data) => {
  
  //   process.stdout.write(data);
  
  // });
  