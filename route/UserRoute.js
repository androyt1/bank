const UserController=require('../controller/UserController')
const express=require('express')
const verifyUser=require('../middleawres/verifyUser')

const UserRoute=express.Router()

UserRoute.use(verifyUser)

UserRoute.route("/get-all-users").get(UserController.allUsers)
UserRoute.route("/find-user-account/:data").get(UserController.findUserByAccount)
UserRoute.route("/find-user-email/:data").get(UserController.findUserByEmail)
UserRoute.route("/find-update-user/:id").put(UserController.findEditUser)

UserRoute.route("/me").get(UserController.getLoggedInUser)

module.exports=UserRoute