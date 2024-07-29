const mongoose=require('mongoose');

const userModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Cw8atL3Modu50-P0FRxNgMg6gDH6R9bDAIT6huM6spIw_IzLyfuE6gKpvQ6NqqSdsKA&usqp=CAU"
    },
    
},{timestamps:true});

const User=mongoose.model('User',userModel);

module.exports=User;