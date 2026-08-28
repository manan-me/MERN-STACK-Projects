const ErrorHandler = require("../utils/errorHandle")

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500
  err.message = err.message || "Internal Server Error"


  //wrong mongodb id error
  if(err.name === "CastError"){
    const message=`Resource not found. Invalid: ${err.path}`
    err=new ErrorHandler(message,400)
  }

  //wrong JWT error
  if(err.name === "JsonWebTokenError"){
    const message=`Json web token is invalid, try again`
    err=new ErrorHandler(message,400)
  }
  
  //mONGOOSE DUBLICATE KEY ERROR
  if(err.code === 11000){
    const message=`Dublicate ${Object.keys(err.keyValue)} entered`
    err=new ErrorHandler(message,400)
  }

  //wrong JWT Expire error
  if(err.name === "JsonWebTokenError"){
    const message=`Json web token is Expired, try login again`
    err=new ErrorHandler(message,400)
  }

  res.status(err.statuscode).json({
    success: false,
    message: err.message
  })
}