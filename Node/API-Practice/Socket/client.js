const net = require('net');

// 创建 socket 套接字(TCP?) 作为客户端 主动连接远端服务
let client = net.connect({ port: 8090,host:'192.168.1.110'},()=>{
    console.log('connnected');
});

// 被动监听 远端服务发来的数据
client.on('data', (chunk) => {
    client.write(`我是${client.address().address}`);

    console.log('服务器发来了数据' + chunk.toString());
    // client.end();
});
client.on('end', () => {
    console.log('disconnected');
})