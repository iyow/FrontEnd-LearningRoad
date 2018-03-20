

var module2 = $require('./module2.js');


module.exports = {
  a:{
    say:()=>{
      console.log('module1 say');
    }
  },
  b:module2
};