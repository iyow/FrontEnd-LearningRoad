var express = require("express");
var app = express();
var router = require("./router/router.js");
var db = require("./models/db.js");

//静态资源获取
app.use(express.static('./public'))

// 跨域设置,允许来自所有域的请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
  })

app.get("/getarticles",router.getArticles)
app.get("/article/:id",router.findArticle)
app.get("/delete/:id",router.deleteArticle)
app.get("/getusers",router.getUsers)

app.listen(3000);
