var frames = [];
frames[frames.length] = `
┬┴┬┌─　●─┬─　　│─┼─┐　●├─┤○
┴┬┴├┬　┌─┼─　│◎　│　│　○└┬┘●
─┼─││　│　│　　││─┴─┴　──┼──
●│○││　┴─┼─　　│○　　●　／　│　＼
`;

frames[frames.length] = `
 /'　\\\\　　 //\\\\ 
　　　\\\\　 //　\`\\ 
　　　 \\\\ //           祝你：
　　　.-'^'-. 
　　.' a___a \`.           春节愉快 合家欢乐！
　 ==　(___)　== 
　　'. ._I_. .'           心想事成 红包拿来！
____\/.\`-----'.\\____ 
   [###(__)####             
`;

frames[frames.length] = `
                  ,;,,;
                 ,;;'(    马
       __      ,;;' ' \\   ┇
    /'  '\\'~~'~' \\ /'\\.)  到 
 ,;(      )    /  |.      ┇
,;' \\    /-.,,(   ) \\     成
     ) /       ) / )|     ┇ 
     ||        ||  \\)     功
     (_\\       (_\\
`;

var index = 0;

var render = () => {
  process.stdout.write('\033[0f');
  process.stdout.write('\033[2J');
  
  if (index === frames.length) {
    index = 0;
  }
  console.log(frames[index++]);
  setTimeout(render, 200);
};

setTimeout(render, 200);