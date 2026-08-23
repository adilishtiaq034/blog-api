const Like = require('../models/like-model');

const likePost = async function(req,res){
      
    const postId = req.params.postId
    const userId = req.user.userId

    if(!postId){
        return res.status(400).json({message:'Please provide postId'})}
    
    const existingLike = await Like.findOne({post:postId,likedBy:userId})
    if(existingLike){
        return res.status(400).json({message:'You have already liked this post'})}
    
        const newLike = await Like.create({
            post:postId,
            likedBy:userId
        })

        res.status(201).json({message:'Post liked successfully'})

}