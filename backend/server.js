const express=require('express');
const dotenv=require('dotenv');
const connectDB = require('./Config/db');
const userRoutes=require('./routes/userRoutes')
const app=express();

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/user',userRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server is running");
})


