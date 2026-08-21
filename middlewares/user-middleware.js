const jwt = require('jsonwebtoken')

const userMiddleware = async function(req,res,next){

    try{
const header = req.headers['authorization']

if(!header){
    return res.status(400).json({
        message:"Header is Missing"
     })
}
 
const token = header.split(" ")[1]
if(!token){
    return res.status(400).json({
        message:"Token is missing"
     })
}

const decoded = jwt.verify(token,process.env.jwt_secret)
req.user = decoded

next()}
catch(err){
    res.status(401).json({
        message:"Invalid Token"
    })
}
}

module.exports = userMiddleware