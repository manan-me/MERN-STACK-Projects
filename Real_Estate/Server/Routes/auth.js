const express=require("express")
const router=express.Router()  
const {handleSignUp}=require("../Controllers/authControllers") 

router.post("/sign-up",handleSignUp)


module.exports=router