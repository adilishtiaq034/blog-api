const express = require('express')
const router = express.Router()

const userMiddleware = require('../middlewares/user-middleware');
const {createComment,getAllComments,deleteComment} = require('../controllers/comment-controller')

router.post('/:postId',userMiddleware,createComment)
router.get('/:postId',getAllComments)
router.delete('/:commentId',userMiddleware,deleteComment)

module.exports = router