//external imports
const bcrypt=require('bcrypt');

//Get Login Page
function getUser(req,res,next){
    res.render('users');
  }
  
async function addUser(req,res,next){
    let newUser;
    const hashPassword=await bcrypt.hash(req.body.password,10);
   if(req.files && req.files.length >0){
    newUser= new User({
        ...req.body,
        avatar:req.files[0].filename,
        password:hashPassword,
    });
   }else{
     newUser=new User({
        ...req.body,
        password:hashPassword,
     });
   }
   try {
     const result=await newUser.save();
     res.status(200).json({
        meassge:"User Was added successfully",
     })
   } catch (error) {
        console.log(error.meassge);
        res.status(500).json({
            errors:{
                common:{
                    msg:"Unkown error occured",
                },
            },
        });
   }
}




  module.exports={
      getUser,
      addUser
  }