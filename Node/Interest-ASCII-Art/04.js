var fs = require('fs');
var path = require('path');

var dirinfo = fs.readdirSync(path.join(__dirname, './frames'));
// console.log(dirinfo);

var files = [];

dirinfo.forEach((item) => {
  files[files.length] = fs.readFileSync(path.join(__dirname, './frames', item), 'utf8');
});
// for(var i = 0; i<)

var index = 0;

var render = () => {
  process.stdout.write('\033[0f');
  process.stdout.write('\033[2J');

  if (index === files.length) {
    index = 0;
  }
  console.log(files[index++]);
  setTimeout(render, 200);
};

setTimeout(render, 80);