const http = require('http');

// 创建一个http serve 并监听8090端口 放入异步队列中等待触发
let server = http.createServer((request, response) => {
    console.log(request.url)
    // 处理跨域
    //访问控制允许来源：所有
    response.setHeader('Access-Control-Allow-Origin', '*');
    //访问控制允许报头 X-Requested-With: xhr请求
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //访问控制允许方法
    response.setHeader('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS');
    //自定义头信息，表示服务端用nodejs
    response.setHeader('X-Powered-By', 'nodejs-ykp-server');


    let serveradd = server.address();
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    // res.write(data)
    // res.end()
    response.end(`欢迎${serveradd.address}:${serveradd.port}:${serveradd.family}访问locathost8090`)
});


server.listen(8090, '127.0.0.1');