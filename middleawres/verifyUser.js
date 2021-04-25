const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const ACCESS_TOKEN=process.env.ACCESS_TOKEN
const errorHandler=require('express-async-handler')
const User=require('../model/User')

const verifyUser=errorHandler(async(req,res,next)=>{
    const token=req.cookies.jwt  
    if(!token || token==="expired"){
        throw new Error("You are not authorized to view this route")
    }
    const verified=await jwt.verify(token,ACCESS_TOKEN)    
    if(!verified){
        throw new Error("Access token denied")
    }
    const user_id=verified.id   
    const user=await User.findById(user_id)    
    if(!user){
        throw new Error("Please register ..access denied")
    }
    user.password=undefined
    res.user=user
    next()
})

module.exports=verifyUser