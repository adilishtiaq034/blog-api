const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const mongoose = require('mongoose')
const postRouter = require('./routers/post-router')
const authRouter = require('./routers/user-routes')

mongoose.connect(process.env.mongodb_uri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err)
})

app.use('/blog', postRouter)
app.use('/auth', authRouter)

app.listen(process.env.port,()=>{
    console.log('Server has started')
})