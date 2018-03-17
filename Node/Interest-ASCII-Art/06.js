// var questions = {
//   text: '你的兴趣爱好',
//   answers: {
//     '抽烟': {
//       text: '你喜欢抽什么牌子的烟呢？',
//       answers: {
//         '大前门': '你个屌丝，还抽烟',
//         '中华': '你个屌丝，没钱还抽中华',
//       }
//     },
//     '喝酒': {
//       text: '你能喝多少？',
//       answers: {
//         '二两': '喝酒有害 健康',
//         '一斤': '走喝酒去',
//         '一直喝': '吹什么牛波',
//       }
//     },
//     '烫头': {
//       text: '你想要烫个什么造型',
//       answers: {
//         '杀马特': '杀马特杀马特',
//         '洗剪吹': '洗剪吹洗剪吹洗剪吹',
//       }
//     }
//   }
// };

// process.stdout.write('你的兴趣爱好是？');

// process.stdin.

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
    if (chunk.trim() === 'q') {
      process.exit();
    }
  }
});

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });
