const express=require("express")
const errorMiddleware=require("./Middleware/error")
const app=express()

app.use(express.json())

//Routes import
const userRouter=require("./Routes/user")
const authRouter=require("./Routes/auth")

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


app.use(errorMiddleware)
module.exports=app  