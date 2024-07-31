const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB = require('./Config/db');
const userRouter=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const chatRouter = require('./routes/chatRoutes');
const app=express();

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("server is running");
})


