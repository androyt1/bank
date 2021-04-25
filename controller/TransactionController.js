const errorHandler=require('express-async-handler')
const Transaction=require('../model/Transaction')
const User=require('../model/User')

exports.newTransaction=errorHandler(async(req,res)=>{
    const{amount,type,accountNumber,remark}=req.body
    const user=res.user
    if(type=="transfer"){
        const account_owner=await User.findOne({account_number:accountNumber})
        if(!account_owner){
            res.status(400).json({message:"Incorrect account number"})
        }
       else{
                let user_balance=parseInt(user.balance )               
                if(user_balance > 0 && user_balance > parseInt(amount)){
                     user_balance -= parseInt(amount)
                    let currentBalance=parseInt(account_owner.balance  )      
                    if(parseInt(amount) > 0){
                        currentBalance+=parseInt(amount)
                        const transaction1=await Transaction.create({
                            type,
                            sender:`${user.lastname} ${user.firstname}`,
                            receiver: `${account_owner.lastname} ${account_owner.firstname}`,
                            amount:parseInt(amount),
                            accountNumber,
                            balance:currentBalance,
                            remark:remark,
                            owner:account_owner._id
                        })

                        // user.balance=user_balance
                        // account_owner.balance=currentBalance
                        const user_id=user._id
                        const account_id=account_owner._id

                       await User.findByIdAndUpdate({_id:user_id},{balance:user_balance},{new:true})
                        await User.findByIdAndUpdate({_id:account_id},{balance:currentBalance},{new:true})

                        const transaction2=await Transaction.create({
                            type,
                            sender:`${user.lastname} ${user.firstname}`,
                            receiver: `${account_owner.lastname} ${account_owner.firstname}`,
                            amount:parseInt(amount),
                            accountNumber,
                            balance:parseInt(user_balance),
                            remark:remark,
                            owner:user._id
                        })
                        res.status(200).json({message:"Transaction was successful"})
                    }else{
                        res.status(400).json({message:"Please enter a valid amount"})
                    }
                }else{
                    throw new Error("Tranfer transaction failed")
                }
        
       }
    }
  else if(type=="check-balance")
    {
        const balance=user.balance
       if(!balance){
           throw new Error("An error occurred, please try again later")
       }else{
        res.status(200).json({message:"Your Account Balance is",balance})
       }
    }else if(type=="withdrawal")
    {
        console.log("We want to withdraw money from your account")
        let curbalance=parseInt(user.balance)
        if(curbalance > 0 && curbalance > parseInt(amount)){
            curbalance -=parseInt(amount)
            await User.findByIdAndUpdate({_id:user._id},{balance:curbalance},{new:true})
            const transaction=await Transaction.create({
                type,
                sender:`${user.lastname} ${user.firstname}`,
                receiver: `${user.lastname} ${user.firstname}`,
                amount:parseInt(amount),
                accountNumber:user.account_number,
                balance:parseInt(curbalance),
                remark:remark,
                owner:user._id
            })
            res.status(200).json({message:"Transaction was successful",curbalance})
        }

    }else if(type=="deposit"){
        console.log("We want to add money to your account")
        let curbalance=parseInt(user.balance)
        if(curbalance >= 0 && amount > 0){
            curbalance += parseInt(amount)
            await User.findByIdAndUpdate({_id:user._id},{balance:curbalance},{new:true})
            const transaction=await Transaction.create({
                type,
                sender:`${user.lastname} ${user.firstname}`,
                receiver: `${user.lastname} ${user.firstname}`,
                amount,
                accountNumber:user.account_number,
                balance:curbalance,
                remark:remark,
                owner:user._id
            })
            res.status(200).json({message:"Transaction was successful",curbalance})
        }

    }
})

exports.findTransaction=errorHandler(async(req,res)=>{
    const user=req.user 
    if(!user){
        throw new Error("You are not authorized to carry out this operation")
    }else{
        const user_id=user._id
        const transactions=await User.findById({_id:user_id}).populate("transactions")
        res.status(200).json({message:"Transaction found",transactions})
    }
})