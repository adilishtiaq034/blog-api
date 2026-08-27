const express = require("express");
const router = express.Router();
const uploads = require('../middlewares/image-middleware')
const {register,login} = require('../controllers/user-controller')

router.post('/register', uploads.single('profileImage'), register)
router.post('/login',login)

module.exports = router