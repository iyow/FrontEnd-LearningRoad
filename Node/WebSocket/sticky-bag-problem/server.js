// server.js
const net = require('net');
const port = 8888;

const server = net.createServer(socket => {
    console.log('socket connected');

    socket.on('data', chunk => {
        chunk = chunk.toString();
        if (chunk == null) {
            console.log('chunk is null, seems to end now');
        }
        console.log(`socket got data: ${chunk}`);
    });

    socket.on('end', () => console.log('socket ended'))
        .on('close', () => console.log('socket closed'))
        .on('error', err => console.error(`socket error: ${err.stack}`));
});

server.listen({
    port: port
}, () => console.log(`server listening at ${port}`));

// “粘包”不是Bug，是TCP天然的行为。
// 我们认为发生了“粘包”，
// 是因为我们把数据根据业务属性进行了“分包”。
// 对于TCP来说，这些“包”都是二进制的0和1而已。\
// 当发送端调用socket.write(data)时，
// 系统并不会立刻把这个包发送出去，而是把它放到一个发送缓冲区里。
// 具体需要发送多少数据（字节），什么时候发送，是由TCP拥塞控制策略来决定的。
// 同样，在接收端有一个接收缓冲区，收到的数据会先放到接收缓冲区里，
// 然后程序再从这里读取一部分数据（字节）进行消费。TCP本身是流式协议，