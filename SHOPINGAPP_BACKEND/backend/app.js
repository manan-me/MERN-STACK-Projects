const express=require('express')
const errorMiddleware=require("./Middleware/error")

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('query parser', 'extended')


//Routes
const product=require('./Routes/productRoutes')
const user=require('./Routes/user')

app.use('/api/v1',product)
app.use('/api/v1',user) 

app.use(errorMiddleware)

module.exports=app