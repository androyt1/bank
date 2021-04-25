const jwt=require('jsonwebtoken')
const SECRET=process.env.ACCESS_TOKEN

const signJwt=async(id)=>{
   return await jwt.sign(id,SECRET,{expiresIn:'1d'})
}

module.exports=signJwt