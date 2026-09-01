const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const postRouter = require('./routers/post-router')
const authRouter = require('./routers/user-routes')
const commentRouter = require('./routers/comment-router')
const likeRouter = require('./routers/like-router')


app.use('/uploads', express.static('uploads'))

app.use('/blog', postRouter)
app.use('/auth', authRouter)
app.use('/comment', commentRouter)
app.use('/like', likeRouter)

module.exports = app