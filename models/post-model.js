const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({


     title:{
             type: String,
             required: true,
             maxlength: 50,
             minlength: 5,
             trim: true
     },
     content:{
            type: String,
            required: true,
            maxlength: 1000,
            minlength: 10,
            trim: true
     },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{timestamps: true})

const Post = mongoose.model('Post',postSchema)

module.exports = Post