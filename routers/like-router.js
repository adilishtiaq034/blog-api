const express = require("express");
const router = express.Router();
const {likePost} = require('../controllers/like-controller')

router.post('/:postId',likePost)


module.exports = router