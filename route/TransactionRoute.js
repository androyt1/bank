const verifyUser=require('../middleawres/verifyUser')
const express=require('express')
const TransactionController=require('../controller/TransactionController')

const TransactionRoute=express.Router()
TransactionRoute.use(verifyUser)

TransactionRoute.route("/create-transaction").post(TransactionController.newTransaction)
TransactionRoute.route("/find-transaction").get(TransactionController.findTransaction)

module.exports=TransactionRoute