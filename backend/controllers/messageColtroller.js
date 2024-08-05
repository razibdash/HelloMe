const Message=require('../models/messageModel');
const User=require('../models/userModel');
const Chat=require('../models/chatModel')
const sendMessage=async(req,res)=>{
  const {content,chatId}=req.body;
  if(!content || !chatId){
    console.log("Invalid data passed into request");
    return  res.sendStatus(400);
  }
   let newMessage={
    sender:req.user._id,
    content:content,
    chat:chatId,
   }
   console.log(newMessage);
   try {
    let message=await Message.create(newMessage);
   message=await message.populate('sender',"name picture");
   message=await message.populate('chat');
   message=await User.populate(message,{
    path:'chat.users',
    select:'name picture,email',
   });
    
   await Chat.findByIdAndUpdate(req.body.chatId,{
    latestMessage:message
   })

   res.json(message)

   } catch (error) {
     res.status(400);
     throw new Error(error.message);
   }
}

const allmessage=async(req,res)=>{
  try {
    const message=await Message.find({chat:req.params.chatId}).populate('sender','name picture email').populate('chat');
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

module.exports={sendMessage,allmessage}