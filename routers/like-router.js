const express = require("express");
const router = express.Router();
const {likePost} = require('../controllers/like-controller')
const userMiddleware = require('../middlewares/user-middleware')
router.post('/:postId',userMiddleware,likePost)


module.exports = router