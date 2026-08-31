const express=require("express")
const router=express.Router()  
const {handleTest}=require("../Controllers/userControllers") 

router.get("/test",handleTest)


module.exports=router