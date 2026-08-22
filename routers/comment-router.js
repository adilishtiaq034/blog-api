const express = require('express')
const router = express.Router()

const userMiddleware = require('../middlewares/user-middleware');
const {createComment,getAllComments} = require('../controllers/comment-controller')

router.post('/:postId',userMiddleware,createComment)
router.get('/:postId',getAllComments)

module.exports = router