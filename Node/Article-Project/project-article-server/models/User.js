var mongoose = require('mongoose');

//schema
var userSchema = new mongoose.Schema({
    "avatar"  : String,
    "nickname" : String,
    "email" : String,
    "password" : String,
    "role" : Number
});

//model
var User = mongoose.model("User",userSchema);

module.exports = User;