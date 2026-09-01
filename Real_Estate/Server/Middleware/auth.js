const catchAsyncError = require("./catchAsyncError");
const User=require("../Model/user");
const ErrorHandler=require("../utils/errorHandle")
const jwt=require("jsonwebtoken")


const Authorized=catchAsyncError(async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return next(new ErrorHandler("Please login to get access",401))
    }  
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    if(!decodedData){
        return next(new ErrorHandler("Invalid Token",401))
    }
    const  user=await User.findById(decodedData.id)
    req.user=user;
    next()
})


const restrictTo=(roles=[])=>{
    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403))
        }
        next()
}
}

module.exports={Authorized,restrictTo}