const mongoose=require('mongoose')


function MongooseConnect(url){
    return mongoose.connect(url)
}

module.exports=MongooseConnect