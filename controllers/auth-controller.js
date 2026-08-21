const Auth = require ('../models/auth-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async function(req,res){
    
    const {name,email,password} = req.body
    try{
    const user = await Auth.findOne({email})
    if(user){
        return res.status(400).json({message:"User already exists"})}

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await Auth.create({name,email,password:hashedPassword})
    res.status(201).json({message:"User created successfully", user:newUser})
    }
    catch(err){
        res.status(500).json({message:"Server error", error:err.message})}
}
 
const login = async function(req,res){
 const {email,password} = req.body

 const user = await Auth.findOne({email})
 if(!user){
     return res.status(400).json({message:"Invalid credentials"})
 }
 const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid password"})
    }
  
const token = jwt.sign({
    userId:user._id,
    }, process.env.jwt_secret, {
    expiresIn:'5d'
})

res.status(200).json({message:"Login successful", token})


}

module.exports = {register,login}