const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user-middleware');

const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/post-controller');

router.post('/posts',userMiddleware, createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id',userMiddleware, updatePost);
router.delete('/posts/:id',userMiddleware, deletePost);

module.exports = router;