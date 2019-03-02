var Article = require("../models/Article.js");
var User = require("../models/User.js");


// 获取所有文章数据
exports.getArticles = function(req,res,next){
    Article.find({},function(err,result){
        //result就是所有文章数据数组
        // res.render("index",{
        //     "students" : result
        // });
            res.send(result);
    });
}
// 获取某篇文章
exports.findArticle = function(req,res,next){
    Article.find({"_id":req.params["id"]},function(err,result){
            res.send(result);
    });
}

// 删除某篇文章
exports.deleteArticle = function (req,res,next) {
    console.log(req.params["id"]);
    // res.send(true);
    Article.remove({"_id":req.params["id"]},function (err,result) {
        res.send(true);
    })
}
// 获取所有用户信息
exports.getUsers = function (req,res,next) {
    User.find({},function(err,result){
        res.send(result);
    });
}
