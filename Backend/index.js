// let res = require('dotenv').config()
// console.log('hi',res)

const express =require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const app= express()

const {userRouter}=require('./router/user')

const path=require('path')
// const connectDatabase=require('./database/index')

app.use(express.json())
app.use(cors())
app.use(logger)
app.use(userRouter)


// app.listen(3000)

async function connectDatabase(){

    try{

      let result = await mongoose.connect('mongodb://127.0.0.1:27017')
       console.log(result)
      console.log("Connected")

    //   await mongoose.close();

    }catch(err){
         console.log(err)
       console.log("not connected")
    }
}




function logger(req , res , next){
    console.log(new Date() , req.method , req.path);

    next();
}

function setReqContext(req, res, next) {
    req.context = {
        // user will be present for authenticated routes
    }
    next();

}


const PORT = process.env.PORT || 8080

connectDatabase().then(() => {
    app.listen(PORT , () => {
        console.log(`server is listening at ${PORT}`)
    })
})
