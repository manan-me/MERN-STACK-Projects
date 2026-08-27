const express = require("express");
const router = express.Router();
const {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
  handleForgotPassword
} = require("../Controllers/userController");

router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);
router.get("/logout",handleLogoutUser);
router.post("/password/forgot",handleForgotPassword)
module.exports = router;
