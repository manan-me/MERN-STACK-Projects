const dotenv=require('dotenv')
const app=require('./app')

//handling uncaught error
process.on("uncaughtException",(error)=>{
     console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to uncaught error Exception`)
        process.exit(1)


})


//config
 dotenv.config({path:'Server/config/config.env'})  



 //Running on port
 const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})



//Unhandeled promise rejection
process.on("unhandledRejection",error=>{
    console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to unhandeled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})