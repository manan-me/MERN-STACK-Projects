const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/user");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

const handleSignUp = catchAsyncErrors(async (req, res, next) => {
 const { username, email, password } = req.body;
 

 const user = await User.create({
   username,
   email,
   password,
 });

 sendToken(user, 201, res);

});

//Login a user
const handleSignIn=catchAsyncErrors(async (req,res,next)=>{
  const { email, password } = req.body;

  //check if user gived email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Pleaseenter email and password both", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user.password) // should show hashed string, not undefined

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched =await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 201, res);
});

module.exports = { handleSignUp, handleSignIn };
