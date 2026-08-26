const sendToken = (user, status, res) => {
  const token = user.getJWTToken();
  //option for cookie
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  res.status(status).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};


module.exports=sendToken