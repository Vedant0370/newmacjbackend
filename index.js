const express = require('express')
require('dotenv').config()

const mongoose = require('mongoose')


const app = express()

const PORT = process.env.PORT || 70000


mongoose.connect( process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to mongodb ")

})
.catch((e)=>{
    
    console.log(e)
})




app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT} `)
})