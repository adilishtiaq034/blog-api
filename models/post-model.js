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
     category:{
            type: String,
            required: true,
            enum: ['Technology', 'Science', 'Health', 'Business', 'Entertainment', 'Sports', 'Politics', 'Education', 'Travel', 'Food']
     },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    }
},
{timestamps: true})

const Post = mongoose.model('Post',postSchema)

module.exports = Post