const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/user");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const bcrypt=require("bcrypt")

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
const handleSignIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user gived email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password both", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

//handle signIn using google
const handleGoogleSignIn = catchAsyncErrors(async (req, res, next) => {
  const { username, email, photoURL } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    sendToken(user, 201, res);
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const newUser = await User.create({
      username:
        username.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 9000 + 1000),

      email,
      password: hashedPassword,
      avatar: photoURL,
    });
    sendToken(newUser, 201, res);
  }
});

//update user profile
const updateUser = catchAsyncErrors(async (req, res, next) => {
  const updates = { ...req.body }

  if (req.file) {
    updates.avatar = req.file.path  // cloudinary URL
  }
  

  const user = await User.findByIdAndUpdate(req.params.id, updates, { returnDocument: 'after' })
    sendToken(user, 201, res);

})

//delete user profile
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});

//hanlde sign out
const handleSignOut = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,});
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
})

module.exports = { handleSignUp, handleSignIn, handleGoogleSignIn, updateUser, deleteUser, handleSignOut };
