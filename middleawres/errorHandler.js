
const errorHandler=(err,req,res,next)=>{
    let errorCode=res.statusCode===200 ? 500 :res.statusCode
    res.statusCode=errorCode
    res.json({message:err.message})
}

module.exports={errorHandler}