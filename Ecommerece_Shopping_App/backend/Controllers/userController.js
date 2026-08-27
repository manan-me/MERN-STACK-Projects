const ErrorHanlder = require("../utils/errorHandle");
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/user");
const sendToken = require("../utils/jwtToken");

//Register a user
const handleCreateUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      publicId: "this is sample id",
      url: "temp",
    },
  });
  sendToken(user, 201, res);
});

//Login a user
const handleLoginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user gived email and password both
  if (!email || !password) {
    return next(new ErrorHanlder("Pleaseenter email and password both", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHanlder("Invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHanlder("Invalid email or password", 401));
  }
  sendToken(user, 201, res);
});

//Logout User
const handleLogoutUser = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: "Successfuly Logged Out",
  });
});

//Forget Password
const handleForgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHanlder("No User Found", 404));
  }

  // Get reset Password Token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Your Password Reset Token is : \n\n ${resetPasswordUrl} \n\n If you have not requested email then, please ignore it`;
  
  
  try {
    await sendEmail({
      email:user.email,
      subject:`Ecommerce Password Recovery`,
      message

    })

    return res.status(201).json({
      success:true,
      msg:`Email sent to ${user.email} successfuly`
    })
    
  } catch (error) {
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHanlder(error.message,500))
  }
});


//Reset Password
const handleResetPassword=catchAsyncErrors(async (req,res,next)=>{
  //creating token hash
  const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");


      const user=await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})

      

})





module.exports = {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
  handleForgotPassword,
};
