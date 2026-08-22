const Comment = require('../models/comment-model')

const createComment = async function(req,res){

 const postId = req.params.postId
 const userId = req.user.userId
 const {comment} = req.body

 if(postId && userId && comment){
       const newComment = Comment.create({
        post:postId,
        comment:comment,
        createdBy:userId
       })
       res.status(201).json({message:'Comment created successfully',newComment})

 }
 else{
    return res.status(400).json({message:'Please provide all required fields'})
 }
 } 
 