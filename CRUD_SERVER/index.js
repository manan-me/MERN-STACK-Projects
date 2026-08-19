const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());

//DB Connection
const connectMongoDb=require('./dbConnection')

connectMongoDb("mongodb://127.0.0.1:27017/crud")
.then(()=>{console.log("Mongo DB is connected Succesfully");
})
.catch((e)=>{console.log(e);
})
app.use(cors());


//Routes
const user=require("./Model/crud")

app.post('/create',(req,res)=>{
    user.create({...req.body})
    .then((user)=>{return res.json(user)})
    .catch((e)=>{return res.json(e)})
})

app.get('/',async  (req,res)=>{
    const users=await user.find({})
    console.log(users);
    
    return res.json(users)
})

app.get('/getUser/:id', async (req,res)=>{
    const id=req.params.id
    const userr=await user.findById(id)
    return res.json(userr)
})
app.post('/update/:id', async (req,res)=>{
    const id=req.params.id
    await user.findOneAndUpdate({_id:id},{...req.body})
    return res.json({msg:'Done'})
    
})

app.delete('/delete/:id',async (req,res)=>{
    const id=req.params.id
    await user.findOneAndDelete({_id:id})
    return res.json()
})











const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
