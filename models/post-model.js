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
        type: String,
        maxlength: 15,
        minlength: 3,
        required: true,
        trim:true
    }
},
{timestamps: true})

const Post = mongoose.model('Post',postSchema)

module.exports = Post