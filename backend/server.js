const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB = require('./Config/db');
const router=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app=express();

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user',router);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("server is running");
})


