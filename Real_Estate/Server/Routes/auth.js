const express=require("express")
const router=express.Router()  
const {handleSignUp,handleSignIn}=require("../Controllers/authControllers") 

router.post("/sign-up",handleSignUp)
router.post("/sign-in",handleSignIn)


module.exports=router