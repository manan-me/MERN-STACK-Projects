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
module.exports = { handleSignUp };
