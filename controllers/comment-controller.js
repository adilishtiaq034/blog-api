const Comment = require('../models/comment-model')

const createComment = async function(req,res){

 const postId = req.params.postId
 const {comment} = req.body
 const userId = req.user.userId

 if(postId && comment){
       const newComment = await Comment.create({
        post:postId,
        comment:comment,
        createdBy:userId
       })
       res.status(201).json({message:'Comment created successfully',
        comment:newComment})

 }
 else{
    return res.status(400).json({message:'Please provide all required fields'})
 }
 } 




 const getAllComments = async function(req,res){
            
    const postId = req.params.postId

    if(!postId){
        return res.status(400).json({message:'Please provide postId'})
}
   const comments = await Comment.find({post:postId}).populate('createdBy','name email')
   if(comments.length === 0){
    return res.status(404).json({message:'No comments found for this post'})
   }
    res.status(200).json({message:'Comments fetched successfully',
        comment:comments})
 }




 module.exports = {createComment,getAllComments}    


 













 
