const mongoose=require("mongoose");
const connectDB=async(req,res)=>{
   try {
     const conn=await mongoose.connect(process.env.MONGO_URI);
     console.log(`mongoDB Connected ${conn.connection.host}`)
   } catch (error) {
    console.log("mongo error");
     res.status(401).json({error:error.message});
    
     process.exit();
   } 
}

module.exports=connectDB;