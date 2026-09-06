const express=require("express")
const cookieParser=require("cookie-parser")
const errorMiddleware=require("./Middleware/error")
const app=express()

app.use(express.json())
app.use(cookieParser())

//Routes import
const userRouter=require("./Routes/user")
const authRouter=require("./Routes/auth")
const listingRouter=require("./Routes/listings")

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listings",listingRouter)


app.use(errorMiddleware)
module.exports=app  