const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
     
    post:{
             type:mongoose.Schema.Types.ObjectId,
             ref: 'Post',
             required: true
    },
    comment:{
             type:String,
             maxlength:100,
             minlength:1,
             trim:true,
             required:true
    },
    createdBy:{
             type:mongoose.Schema.Types.ObjectId,
             ref: "Auth",
             required:true
}
},
{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment