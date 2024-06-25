//external imports
const bcrypt=require('bcrypt');

//Get Login Page
function getUser(req,res,next){
  
  console.log(req.body);

    res.render('users');
  }
  
async function addUser(req,res,next){
    let newUser;
    console.log(req.body);
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
         result,
        meassge:"User Was added successfully",
     })
   } catch (error) {
        console.log(error);
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