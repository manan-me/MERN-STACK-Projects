const  {Schema,model}=require("mongoose")

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:String,
        required:true,
    },
},{timestamps:true})

const user=model("user",userSchema)

module.exports=user