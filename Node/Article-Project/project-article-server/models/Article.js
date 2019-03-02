var mongoose = require('mongoose');

//schema
var articleSchema = new mongoose.Schema({
    "images"  : [String],
    "title" : String,
    "publish_time" : String,
    "visit_count": Number,
    "like_count": Number,
    "comment": [{
        "avatar": String,
        "nickname": String,
        "created_time": String,
        "content": String
    }]
});

//model
var Article = mongoose.model("Article",articleSchema);

articleSchema.statics.someFunction = function(kidarray,sid,callback){
    
}


module.exports = Article;