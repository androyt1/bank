const express=require('express')
const AuthController=require('../controller/AuthController')
const AuthRoute=express.Router()
const verifyUser=require('../middleawres/verifyUser')


AuthRoute.route("/register").post(AuthController.register)
AuthRoute.route("/login").post(AuthController.login)
AuthRoute.route("/logout").get(AuthController.logout)
// Secure midlleware
AuthRoute.use(verifyUser)
AuthRoute.route("/secure").get(AuthController.secure)
module.exports=AuthRoute