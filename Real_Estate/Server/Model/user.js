const {Schema,model}=require("mongoose")
const validator = require("validator");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Please enter your username"],
        unique:true,
        maxLength:[30,"Username cannot exceed 30 characters"]   
    },
    email:{
        type:String,
        required:[true,"Please enter your email"], 
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"] 
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],  
        select:false,
        minLength:[8,"Password should be greater than 8 characters"]
    },
    avatar: {
      type: String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSti0Krop_9RKjXIviYcR1PQoGEOErns-ruuQnYkgUDmA&s"
    },
      role: {
      type: String,
      default: "USER",
    }
},{timestamps:true})


userSchema.pre("save",async function(){
    if(!this.isModified("password")) return
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id,username:this.username},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    }  )
}
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=model("User",userSchema)
module.exports=User

