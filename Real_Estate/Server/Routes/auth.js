const express=require("express")
const router=express.Router()  
const {handleSignUp,handleSignIn,handleGoogleSignIn}=require("../Controllers/authControllers") 

router.post("/sign-up",handleSignUp)
router.post("/sign-in",handleSignIn)
router.post("/google-sign-in",handleGoogleSignIn)


module.exports=router