const accessChat=async()=>{
  const{userId}=req.body;
  if(!userId){
    console.log("userid param not sent");
    return res.sendStatus(400);
  }
}