const express = require("express");
const router = express.Router();
const {likePost,unlikePost} = require('../controllers/like-controller')
const userMiddleware = require('../middlewares/user-middleware')
router.post('/:postId',userMiddleware,likePost)
router.delete('/:postId',userMiddleware,unlikePost)


module.exports = router