var express = require('express')
var MongoClient = require('mongodb').MongoClient
var cookieParser = require('cookie-parser')
var session = require('express-session')




var app = express();
app.use(cookieParser());
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))

app.get('/', function (req, res) {

    // res.cookie("hobby", "coding",  {maxAge:60000, httpOnly:true}); 

    if(req.session.login){
        res.send("欢迎"+req.session.username);
    }
    else{
        res.send("请登录");
    }
    // var url = 'mongodb://localhost:27017/test';


//     MongoClient.connect(url, function(err, db) {

//   // Create a collection we want to drop later
//   var collection = db.db('test').collection('runoob'); 
  
//   // Perform a simple find and return all the documents
//   collection.find().toArray(function (err, docs) {
//       console.log(docs); 
//     db.close(); 
//   }); 
  // Insert a bunch of documents for the testing
//   collection.insertMany([{a:1}, {a:2}, {a:3}], {w:1}, function(err, result) {
//     console.log(result);
//   });
// }); 

// res.send(req.cookies); 
    
}); 

app.get('/login',function(req,res){
    req.session.login = true;
    req.session.username = 'ykp';
    res.send("登录成功");


})


app.listen(3000); 