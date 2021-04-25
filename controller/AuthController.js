 const errorHandler=require('express-async-handler')
const signJwt=require('../middleawres/signJwt')
const User=require('../model/User')

exports.register=errorHandler(async(req,res)=>{
    const user=await User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        phone_number:req.body.phone_number,
        account_number:req.body.phone_number,
    })
    if(user){
        const payload={id:user._id}
        const token=await signJwt(payload)
        console.log("token",token)
        if(token){
            res.cookie("jwt",token,{expire:'1d',httpOnly:true})
            user.password=undefined
            res.status(201).json({message:"New User Created",token,user})
        }else{
            new Error("Registration failed...please try again later")
        }
    }else{
        new Error("Registration failed...please try again later")
    }
})

exports.login=errorHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        throw new Error("User account not found, please register to create an account")
    }
    const ismatch=await user.isPasswordMatch(req.body.password)
    console.log("ismatch",ismatch)
    if(!ismatch){
        throw new Error("Email or password is incorrect")
    }
    const payload={id:user._id}
        const token=await signJwt(payload)
        // console.log("token",token)
        if(token){
            res.cookie("jwt",token,{expire:'1d',httpOnly:true})
            user.password=undefined
            res.status(200).json({message:"User Authenticated",token,user,status:"Success"})
        }else{
            new Error("User login failed")
        }
})

exports.logout=errorHandler(async(req,res)=>{
    const token=req.cookies.jwt 
    if(token){
        res.clearCookie("jwt",{httpOnly:true,expire:'1s'})
         res.status(200).json({message:"User logged off"})
    }
   else{
    res.status(200).json({message:"User logged off"})
   }
})

exports.secure=errorHandler(async(req,res)=>{
    const user=res.user
    console.log(user)
    res.status(200).json({secret:"This is the secret route",user})
})