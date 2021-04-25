require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const MONGO_URL=process.env.MONOGO_URL
const cors=require('cors')
const cookieParser=require('cookie-parser')
const error=require('./middleawres/errorHandler')
const AuthRoute=require('./route/AuthRoute')
const TransactionRoute=require('./route/TransactionRoute')
const UserRoute=require('./route/UserRoute')

const connectDb=async()=>{
    try {
        await mongoose.connect(MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting to database")
    }
}
connectDb()
const app=express()


// set up middlewares
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieParser())
// set up routes
app.use("/api/v1/auth",AuthRoute)
app.use("/api/v1/transaction",TransactionRoute)
app.use("/api/v1/user",UserRoute)
// set up error handler

app.use(error.errorHandler)


let port=process.env.PORT 
app.listen(port,()=>console.log(`server is running on ${port}`))

