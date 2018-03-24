const net = require('net');


let client = net.connect({ port: 8090,host:'192.168.1.110'},()=>{
    console.log('connnected');
});

client.on('data', (chunk) => {
    client.write(`我是${client.address().address}`);

    console.log('服务器发来了数据' + chunk.toString());
    // client.end();
});
client.on('end', () => {
    console.log('disconnected');
})