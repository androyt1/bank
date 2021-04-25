const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"firstname is required"],
        trim:true,
         validate:[validator.isAlpha,"Please enter a valid firstname"],
        minLength:3
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"],
        trim:true,
         validate:[validator.isAlpha,"Please enter a valid lastname"],
        minLength:3
    },
    email:{
        type:String,
        required:[true,"Email address is required"],
        trim:true,
        lowercase:true,
        unique:[true,"Customer with that email already exist"],
        trim:true,
         validate:[validator.isEmail,"Please enter a valid Email Address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:8,
        trim:true,
         validate:[validator.isAlphanumeric,"Please enter a valid password"]
    },
   
    phone_number:{
        type:String,
        required:true,
        unique:[true,"User with this account/phone number already exist"]
    },
    photo:{
        type:String,
        default:"",
        trim:true
    },
    account_number:{
        type:String,
        default:"000000000",
        trim:true
    },
    balance:{
        type:Number,
        default:0
    }
   
},{timestamps:true})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  UserSchema.virtual("transactions",{
        foreignField:"owner",
        localField:"_id",
        ref:"Transaction"
  })
  UserSchema.set("toJSON",{virtuals:true})

  //Verify password
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.model('User', UserSchema);

module.exports=new mongoose.model("User",UserSchema)