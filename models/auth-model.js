const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({

        name:{
            type:String,
            required:true,
            trim:true,
            minlength:3,
            maxlength:30
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:6,
            maxlength:70}
},
{timestamps:true})

const Auth = mongoose.model("Auth",authSchema)

module.exports = Auth