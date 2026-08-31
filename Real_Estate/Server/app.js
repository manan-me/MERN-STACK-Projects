const express=require("express")
const errorMiddleware=require("./Middleware/error")
const app=express()






app.use(errorMiddleware)
module.exports=app  