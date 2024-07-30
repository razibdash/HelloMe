const express=require('express');
const dotenv=require('dotenv');
const connectDB = require('./Config/db');

const app=express();
dotenv.config();
connectDB();



app.listen(process.env.PORT,()=>{
    console.log("server is running");
})


