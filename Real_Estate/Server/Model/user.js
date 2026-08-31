const {Schema,model}=require("mongoose")
const validator = require("validator");
const bcrypt=require("bcrypt")
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
},{timestamps:true})


userSchema.pre("save",async function(){
    if(!this.isModified("password")) return
    this.password=await bcrypt.hash(this.password,10)
})

const User=model("User",userSchema)
module.exports=User

