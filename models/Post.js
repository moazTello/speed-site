const mongoose = require("mongoose");
const schema = mongoose.Schema;
const post = new schema({
    name:String,
    title:String,
    likes:Number,
    isRead:Boolean,
    description:String
});

const Post = mongoose.model("Post", post);
module.exports = Post;