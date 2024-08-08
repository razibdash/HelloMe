const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB = require('./Config/db');
const userRouter=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const chatRouter = require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes')
const app=express();

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRoutes)


app.use(notFound);
app.use(errorHandler);

const server=app.listen(process.env.PORT,()=>{
    console.log("server is running");
});

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:5173'
    }
});

io.on('connection',(socket)=>{
   console.log('connected to socket.io');
   socket.on('setup',(userData)=>{
     socket.join(userData._id);
     socket.emit('connection');
   });

   socket.on('join chat',(room)=>{
     socket.join(room);
   });


   socket.on('new message',(newMessageReceived)=>{
    let chat=newMessageReceived.chat;
    if(!chat.users) return console.log('users not defined');

    chat.users.forEach((user)=>{
        if(user._id==newMessageReceived.sender._id)return;
        socket.in(user._id).emit('message recieved',newMessageReceived);
    });

   });
})



