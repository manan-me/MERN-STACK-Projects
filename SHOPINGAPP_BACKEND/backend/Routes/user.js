const express = require("express");
const router = express.Router();
const {handleCreateUser,handleLoginUser}=require("../Controllers/userController")

router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);


module.exports = router;
