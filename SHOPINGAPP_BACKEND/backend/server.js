const dotenv=require('dotenv')
const MongooseConnect=require('./Config/dbConnector')

//handling uncaught error
process.on("uncaughtException",(error)=>{
     console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to uncaught error Exception`)
        process.exit(1)


})


//config
dotenv.config({path:'backend/config/config.env'})

//DB Connection
MongooseConnect(process.env.DB_URL)
.then(res=>console.log('Mongo DB is connected'))



const app=require('./app')
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is started on ${process.env.PORT}`)
    
})




//Unhandeled promise rejection
process.on("unhandledRejection",error=>{
    console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to unhandeled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
    
})
