const dotenv=require('dotenv')

// Load configuration before importing modules that read environment variables.
dotenv.config({path:'Server/config/config.env'})

const app=require('./app')

//handling uncaught error
process.on("uncaughtException",(error)=>{
     console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to uncaught error Exception`)
        process.exit(1)


})


 //DB Connecction
 const MongooseConnect=require('./config/dbConection')
 MongooseConnect(process.env.DB_URL).then((data)=>{
    console.log(`Mongodb connected with server: ${data.connection.host}`) })



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