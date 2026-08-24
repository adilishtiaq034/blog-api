const Post = require('../models/post-model')

const createPost = async function(req,res){ 
   const {title, content, category} = req.body
    try{
        const newPost = await (await Post.create({title, content, category, createdBy: req.user.userId})).populate('createdBy', 'name email')
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
            
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        if(page < 1 || limit < 1 || limit > 100){
            return res.status(400).json({
                message: 'Page and limit must be positive integers'
            })
        }
        const skip = (page - 1) * limit

        const category = req.query.category
        const search = req.query.search
         const filter={}
         if(category){
        filter.category = category
      }
      if(search){
      
        filter.$or =[
            {
                title : {$regex: search, $options: 'i'}
            },
            { 
                content : {$regex: search, $options: 'i'}
            },
            { 
                category : {$regex: search, $options: 'i'}
            }
        ]}

        const currentPage = page
        const totalPosts = await Post.countDocuments(filter)
        const totalPages = Math.ceil(totalPosts / limit)
        let prevPage = null
        let nextPage = null
        if(currentPage < totalPages){
            nextPage = currentPage + 1
        }
        if(currentPage >= totalPages){
            nextPage = false
        }
        if(currentPage > 1){
            prevPage = currentPage - 1
        }
        if(currentPage <= 1){   
            prevPage = false
        }


     const posts = await Post.find(filter).populate('createdBy', 'name email').skip(skip).limit(limit)
        res.status(200).json({
            message: 'Posts retrieved successfully',
            posts: posts,
            currentPage: currentPage,
            totalPages: totalPages,
            totalPosts: totalPosts,
            prevPage: prevPage,
            nextPage: nextPage
        })
    } catch(err){
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