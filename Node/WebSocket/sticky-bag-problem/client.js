// client.js
const net = require('net');
const port = 8888;
const socket = net.connect({
    port
}, () => {
    console.log('client connected');

    socket.write('aaaaaaaaaaaaaaaaaaaaaaaaa');
    socket.write('bbbbbbbbbbbbbbbbbbbbbbbbb');
    socket.write('ccccccccccccccccccccccccc');
});

socket.on('end', () => console.log('socket ended'))
    .on('close', () => console.log('socket closed'))
    .on('error', err => {
        console.error(`socket error: ${err.stack}`);
    });

// 服务端可能会收到  
// aaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbb
// ccccccccccccccccccccccccc
// 即出现粘包