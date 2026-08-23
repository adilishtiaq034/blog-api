const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
})

const Like = mongoose.model('Like',likeSchema)

module.exports = Like