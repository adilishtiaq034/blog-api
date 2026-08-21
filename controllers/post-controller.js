const Post = require('../models/post-model')

const createPost = async function(req,res){ 
   const {title, content} = req.body
    try{
        const newPost = await (await Post.create({title, content, createdBy: req.user.userId})).populate('createdBy', 'name email')
        res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        })
    }catch(err){
        res.status(400).json({
            message: 'Error creating post',
            error: err
        })
    }}

const getAllPosts = async function(req,res){
    try{
        const posts = await Post.find().populate('createdBy', 'name email')
        res.status(200).json({
            message: 'Posts retrieved successfully',
            posts: posts
        })
    }catch(err){
        res.status(400).json({
            message: 'Error retrieving posts',
            error: err
        })          
    }
}

const getPostById = async function(req,res){
    const id = req.params.id
    try{
        const post = await Post.findById(id).populate('createdBy', 'name email')
        if(!post){
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        res.status(200).json({
            message: 'Post retrieved successfully',
            post: post
        })
    }catch(err){
        res.status(400).json({
            message: 'Error retrieving post',
            error: err
        })
    }
}
const updatePost = async function(req,res){
    const id = req.params.id
    const userId = req.user.userId
    try{         
             const post = await Post.findById(id)
                if(!post){
                    return res.status(404).json({
                        message: 'Post not found'
                    })
                }
                if(!post.createdBy.equals(userId)){
                    return res.status(403).json({
                        message: 'You are not the owner of this post'
                    })
                }
             const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true}).populate('createdBy', 'name email')
              if(!updatedPost){
                res.status(404).json({
                    message: 'Post not found'})
                }
            res.status(200).json({
                message: 'Post updated successfully',
                post: updatedPost})
    }catch(err){
        res.status(400).json({
            message: 'Error updating post',
            error: err
        })
    }


    }

const deletePost = async function(req,res){
    const id = req.params.id
    const userId = req.user.userId
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        if(!post.createdBy.equals(userId)){
            return res.status(403).json({
                message: 'You are not the owner of this post'
            })
        }


    const deletedPost = await Post.findByIdAndDelete(id)
    if(!deletedPost){
        res.status(404).json({
            message: 'Post not found'
        })
    } 
    res.status(200).json({
        message: 'Post deleted successfully'
    })
}
catch(err){
    res.status(400).json({
        message: 'Error deleting post',
        error: err
    })  
}}

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost}