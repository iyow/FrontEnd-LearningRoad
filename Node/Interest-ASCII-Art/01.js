// var stdin = process.stdin;

// stdin.on("data", function (d) {
//   // console.log('\033[2J');
//   var lines = process.stdout.getWindowSize()[1];
//   for (var i = 0; i < lines; i++) {
//     console.log('\r\n');
//   }
//   // note:  d is an object, and when converted to a string it will
//   // end with a linefeed.  so we (rather crudely) account for that
//   // with toString() and then trim()
//   console.log("you entered: [" + d.toString().trim() + "]");
// });


// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log('Thank you for your valuable feedback:', answer);

//   rl.close();
// });

// 人机交互
// 字符画

var frames = [];

frames[frames.length] = `
                    ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
                    ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
                    ▍．∴∵∴∵．∴▅███████████☆ ★∵
                    ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
                    ． ◥███████████████████◤
                    .．.．◥████████████████■◤
`;
frames[frames.length] = `
                ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
                ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
                ▍．∴∵∴∵．∴▅███████████☆ ★∵
                ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
                ． ◥███████████████████◤
                .．.．◥████████████████■◤
`;
frames[frames.length] = `
            ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
            ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
            ▍．∴∵∴∵．∴▅███████████☆ ★∵
            ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
            ． ◥███████████████████◤
            .．.．◥████████████████■◤
`;
frames[frames.length] = `
        ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
        ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
        ▍．∴∵∴∵．∴▅███████████☆ ★∵
        ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
        ． ◥███████████████████◤
        .．.．◥████████████████■◤
`;
frames[frames.length] = `
    ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
    ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
    ▍．∴∵∴∵．∴▅███████████☆ ★∵
    ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
    ． ◥███████████████████◤
    .．.．◥████████████████■◤
`;
frames[frames.length] = `
...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
▍．∴∵∴∵．∴▅███████████☆ ★∵
◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
． ◥███████████████████◤
.．.．◥████████████████■◤
`;



var index = 0;

setInterval(() => {
  //这两行作用，清屏
  process.stdout.write('\033[0f');
  process.stdout.write('\033[2J');

  if (index === frames.length)
    index = 0;
  console.log(frames[index++]);
}, 200);

// var index = 0;

// setInterval(() => {
//   var lines = process.stdout.getWindowSize()[1];
//   for (var i = 0; i < lines; i++) {
//     console.log('\n');
//   }
//   if (index === frames.length)
//     index = 0;
//   console.log(frames[index++]);
// }, 200);



// function clear() {
//   var stdout = "";

//   if (process.platform.indexOf("win") != 0) {
//     stdout += "\033[2J";
//   } else {
//     var lines = process.stdout.getWindowSize()[1];

//     for (var i = 0; i < lines; i++) {
//       stdout += "\r\n";
//     }
//   }

//   // Reset cursur
//   stdout += "\033[0f";

//   process.stdout.write(stdout);
// }

// var index = 0;
// setTimeout(function() {
//   clear();
//   if (index === frames.length) {
//     index = 0;
//   }
//   console.log(frames[index++]);
// }, 200);

// process.title = 'my-application';

// setInterval(() => {
//   process.stdout.write('hello world');
// }, 1000);

// var questions = ['What\'s your name?', 'How old are you?', 'Do you like me?'];

// var answers = [];

// var current = 0;

// console.log(questions[current]);

// process.stdin.on('data', (data) => {
//   answers[current++] = data;
//   if (current === questions.length) {
//     for (var i = 0; i < answers.length; i++) {
//       console.log(answers[i].toString());
//     }
//     process.exit();
//   } else {
//     console.log(questions[current]);
//   }
// });