const ErrorHanlder = require("../utils/errorHandle");
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/user");
const sendToken = require("../utils/jwtToken");

//Register a user
const handleCreateUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      publicId: "this is sample id",
      url: "temp",
    },
  });
  sendToken(user,201,res)

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
  sendToken(user,201,res)
});

module.exports = {
  handleCreateUser,
  handleLoginUser,
};
