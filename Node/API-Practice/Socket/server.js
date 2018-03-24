const net = require('net');


let server = net.createServer((socket)=>{
    
    console.log(`
    remoteaddr【${socket.remoteAddress}】
    remoteport【${socket.remotePort}】
    remotefamily【${socket.remoteFamily}】
    address【${socket.address().address}】
    family【${socket.address().family}】
    port【${socket.address().port}】`);


    socket.write(`hello ${socket.remoteAddress}:${socket.remotePort} 欢迎访问`);
    socket.on('data',(chunk)=>{
        console.log('你发送了数据'+chunk.toString());
    });
});
let serverPort = 8090

server.listen(serverPort,(err)=>{

    if (err) {
        throw err;
    }
    console.log(`服务正常启动于【${serverPort}】...`);
});


