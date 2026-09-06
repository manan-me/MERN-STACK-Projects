const express=require("express")
const router=express.Router()  
const {handleSignUp,handleSignIn,handleGoogleSignIn,updateUser}=require("../Controllers/authControllers") 
const { upload } = require("../config/cloudinary")
const { Authorized } = require("../Middleware/auth")

router.put("/update/:id", Authorized, upload.single("avatar"), updateUser)

router.post("/sign-up",handleSignUp)
router.post("/sign-in",handleSignIn)
router.post("/google-sign-in",handleGoogleSignIn)


module.exports=router