const mongoose=require('mongoose')
const validator=require('validator')

const TransactionSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:{
            values:["deposit","withdrawal","transfer","check-balance,","create-account"],
            message:"Please enter transaction type",
            default:"check-balance"
        }
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
  
    balance:{
        type:Number,
        default:0.0,
         validator:[validator.isnumeric,"Please enter a valid account balance"],
        trim:true
    },
   
    sender:{
        type:String,
        required:true,
        default:"-"
    },
    receiver:{
        type:String,
        default:"-"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    accountNumber:{
        type:String,
        default:"00000000000",
        required:true
    },
    remark:{
        type:String,
        required:[true,"Please enter transaction remark"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=new mongoose.model("Transaction",TransactionSchema)