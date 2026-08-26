const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [5, "Name should have more than 5 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your Passworrd"],
      minLength: [8, "Paaword should have more than 8 characters"],
      select: false,
    },

    avatar: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})


//jwt tokens
userSchema.methods.getJWTToken=function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//comparing password
userSchema.methods.comparePassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const user = model("user", userSchema);

module.exports = user;
