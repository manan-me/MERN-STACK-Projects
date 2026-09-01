const catchAsyncErrors = require("../Middleware/catchAsyncError");
const User = require("../Model/user");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

const handleTest = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Test route is working!"
  });
});

module.exports = { handleTest }
