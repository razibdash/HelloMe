const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const expressAsyncHandler=require('express-async-handler');

const protect=expressAsyncHandler(async(req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token=req.headers.authorization.split(" ")[1];
        //decode token id
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
         const id=decoded.id;
        req.user=await User.findById(id).select('-password');
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized,token faild!");
    }
  }
  if(!token){
    res.status(401);
    throw new Error("Not authrized, not token");
  }
});

module.exports={protect}