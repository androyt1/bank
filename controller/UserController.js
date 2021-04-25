const errorHandler=require('express-async-handler')
const User=require('../model/User')

exports.allUsers=errorHandler(async(req,res)=>{
    const users=await User.find()
    if(!users){
        res.status(200).json({message:"There are no users at the monment"})
    }else{
        res.status(200).json({message:"Users found",users})
    }
})

exports.findUserByAccount=errorHandler(async(req,res)=>{
    const user=await User.findOne({account_number:req.params.data}).populate("transactions")
    if(!user){
        throw new Error("User not found")
    }else{
        res.status(200).json({message:"User found",user})
    }
})

exports.findUserByEmail=errorHandler(async(req,res)=>{
    const user=await User.findOne({email:req.params.data}).populate("transactions")
    if(!user){
        throw new Error("User not found")
    }else{
        res.status(200).json({message:"User found",user})
    }
})

exports.getLoggedInUser=errorHandler(async(req,res)=>{
    let user=res.user
    const id=user._id
    user=await User.findById({_id:id}).populate("transactions")
    if(!user){
        throw new Error("No user logged in")
    }else{
        res.status(200).json({message:"Logged in user is",user})
    }
})

exports.findEditUser=errorHandler(async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user){
        throw new Error("User update failed")
    }else{
        res.status(200).json({message:"User successfully updated",user})
    }
})