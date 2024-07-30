const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../Config/generateToken");
const bcrypt=require('bcrypt');

const registerUser=expressAsyncHandler(async(req,res)=>{
  const {name,email,password,picture}=req.body;
  if(!name || !email || !password){
    res.status(400);
    throw new Error("Please Enter All the Feilds");
  }
  const userExists= await User.findOne({email:email});
  if(userExists){
    res.status(400);
    throw new Error("User Already exits");
  }
  const saltRounds = 10;
  const hasPassword=await bcrypt.hash(password,saltRounds);
  const user=await User.create({
    name,
    email,
    password:hasPassword,
    picture
  });

  if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        picture:user.picture,
        token:generateToken(user._id),
    });
  }else{
    res.status(400);
    throw new Error("User Not Carete!");
  }
});

const authUser=expressAsyncHandler(async(req,res)=>{
   try {
     const {email,password}=req.body;
     const user=await User.findOne({email:email});
    const comparePassword=await bcrypt.compare(password, user.password);
            if(user && comparePassword===true ){
                res.status(201).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    picture:user.picture,
                    token:generateToken(user._id),
                });
            }else{
                res.status(201).json("Authentication Faild!");
            }

        } catch (error) {
            console.log(error.message);
        }
})
module.exports={
    registerUser,
    authUser
}