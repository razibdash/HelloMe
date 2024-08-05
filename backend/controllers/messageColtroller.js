const Message=require('../models/messageModel');

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
   try {
    let message=await Message.create(newMessage);
   message=await message.populate('sender',"name picture")

   } catch (error) {
    
   }
}



module.exports={sendMessage}