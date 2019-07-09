var mongoose = require('mongoose');
var user = new mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
        birthday:Date,
        address:String,
        name:String,
        age:Number,
        phone:String,
        gender:String,
        role:String
    },
    {collection:'users'}
);
module.exports = mongoose.model('user', user);