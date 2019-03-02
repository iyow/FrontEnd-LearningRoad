var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/articlesystem');

var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

module.exports = db;