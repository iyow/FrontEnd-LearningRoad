const fs = require('fs');
const http = require('http');

let server = http.createServer((req,res)=>{
    if (req.url == '/') {
        //显示首页
        fs.readFile('./we-paint.html',(err,data)=>{
            res.end(data);
        });
    }
});

server.on('upgrade',(req,socket,header)=>{
    console.log('emit======upgrade')
})

//创建一个socketio对象
const io = require('socket.io')(server);

io.on("connection",(socket)=>{
    console.log('someone connected');
    //对每个连接 的 客户端用户监听paint事件
    socket.on("paint",(paintInfo)=>{
        //广播 获得的数据到所有客户端

        io.emit("otherpaint",paintInfo)
    });
});


server.listen(8090,"127.0.0.1");
