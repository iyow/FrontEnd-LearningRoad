var http = require('http'); 
var url = require('url'); 
var fs = require('fs'); 
var path = require('path'); 
var MIME = require('./mime').types; 

const PORT = 8080; 
const HOSTNAME = '127.0.0.1'; 


var server = http.createServer((req, res) =>  {
    console.log(req.url);
    var pathName = url.parse(req.url).pathname; 
    // 可将访问路径固定到某文件夹
    // 访问时需要输入具体文件名
    var realPath = path.join("./", pathName); 
    console.log("pathname: "+pathName);
    console.log("realpath: "+realPath);


    var ext = path.extname(realPath); 
    if (ext) {
        ext = ext.slice(1);
    }else{
        realPath = path.join(realPath, 'index.html');
        ext = 'html';
    }
    console.log(ext);
    console.log(realPath);

     fs.exists(realPath, (exists) =>  {
         if ( ! exists) {
             res.writeHead(404,  {
                 'Content-Type':'text/plain'
             }); 
            //  res.write("This request URL " + pathName + " was not found on this server."); 
             res.end("This request URL " + pathName + " was not found on this server."); 
         }else {
             fs.readFile(realPath,'binary', (err, data) =>  {
                 if (err) {
                     res.writeHead(500,  {
                         'Content-Type':'text/plain'
                     }); 
                    //  res.write(err);
                     res.end(err); 
                 }else {
                     var contentType = MIME[ext] || "text/plain"; 
                     res.writeHead(200,  {
                         'Content-Type':contentType
                     }); 
                     res.write(data,'binary'); 
                     res.end(); 
                 }
             })
         }
     })
}); 


server.listen(PORT, HOSTNAME); 
console.log("Server runing at " + HOSTNAME + ":" + PORT + ".");