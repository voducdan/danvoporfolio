var mongoose = require('mongoose');
var post = new mongoose.Schema(
    {
        title: String,
        image: [String],
        content:String,
        topic:String,
        short_description:String,
        author:String,
        date_create:Date,
        link:String,
        markdown:String
    },
    {collection:'posts'}
);
module.exports = mongoose.model('post', post);