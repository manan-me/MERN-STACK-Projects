const ErrorHanlder = require("../utils/errorHandle");
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/user");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    return res.status(200).json({
      success: true,
      msg: `Email sent to ${user.email} successfuly`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHanlder(error.message, 500));
  }
});

//Reset Password
const handleResetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHanlder("Reset Password token is Invalid or Expired", 400),
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHanlder("Confirm Password doesn't match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res);
});

//Get user details
const handleGetUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  return res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password
const handleUpdateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHanlder("Old password is incorrect", 401));
  }

  if (req.body.newPassword === req.body.oldPassword) {
    return next(new ErrorHanlder("Please use a different new Password", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHanlder("Password does'nt match", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Update user profile
const handleUpdateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //we will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData);

  res.status(200).json({
    success: true,
  });
});

//GetAll users
const handleGetAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

//Get specific user
const handleGetAnyUserDeetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHanlder(`No user found with this id : ${req.params.id}`, 400),
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update user Role by Admin
const handleUpdateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  //we will add cloudinary later

  const user = await User.findByIdAndUpdate(req.params.id, newUserData);
  if (!user) {
    return next(
      new ErrorHanlder(`No user found with this id : ${req.params.id}`, 400),
    );
  }

  res.status(200).json({
    success: true,
  });
});

//Delete user
const handleDeleteUser = catchAsyncErrors(async (req, res, next) => {
  //we willl remove clounairy later

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHanlder(`No user found with this id : ${req.params.id}`, 400),
    );
  }
  await user.deleteOne();

  res.status(200).json({
    success: true,
    msg:"User deleted successfuly"
  });
});

module.exports = {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
  handleForgotPassword,
  handleResetPassword,
  handleGetUserDetails,
  handleUpdateUserPassword,
  handleUpdateUserProfile,
  handleGetAllUsers,
  handleGetAnyUserDeetails,
  handleUpdateUserRole,
  handleDeleteUser,
};
