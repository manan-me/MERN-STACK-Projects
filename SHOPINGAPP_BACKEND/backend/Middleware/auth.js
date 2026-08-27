const User = require("../Model/user");
const ErrorHandler = require("../utils/errorHandle");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");


const isAuthenticated=catchAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to get access",401))
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

     req.user=await User.findById(decodedData.id)
     next()

})


function restrictTo(roles = []) {
    return function(req, res, next) {
        if (!roles.includes(req.user?.role)) {
            return next(new ErrorHandler("Access Denied", 403))
        }
        next()
    }
}


module.exports={
    isAuthenticated,
    restrictTo


}