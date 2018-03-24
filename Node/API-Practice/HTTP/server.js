const http = require('http');


let server = http.createServer((request, response) => {


    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    let serveradd = server.address();
    response.end(`欢迎${serveradd.address}:${serveradd.port}:${serveradd.family}访问locathost8090`)
});


server.listen(8090,'127.0.0.1');