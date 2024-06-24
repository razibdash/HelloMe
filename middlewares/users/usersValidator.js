const { check, validationResult } = require("express-validator");
const createError=require('http-errors');
const path=require('path');
const {unlink}=require('fs');
//internal imports
const User=require('../../model/people');
//add user
const addUserValidator=[
    [check('name')
        .isLength({min:1})
        .withMessage("Name is Require")
        .isAlpha('en-US',{ignore:' -'})
        .withMessage("name must not contain anything other than alphabet")
        .trim(),
        check('email')
        .isEmail()
        .withMessage('invalid email address')
        .trim()
        .custom(async(value)=>{
            try {
              const user= await UserActivation.findOne({email:value});
              if(user){
                throw createError("email already is user");
              }   
            } catch (error) {
                throw createError(error.message);
            }
        }),
        check('mobile')
        .isMobilePhone('bn-BD',{
          strictMode:true,
        })
        .withMessage("Mobile number must be valid Bangladeshi mobile number")
        .custom(async(value)=>{
          try {
            const user= await User.findOne({mobile:value});
            if(user){
              throw createError("Mobile already is use");
            }
          } catch (error) {
            throw createError(error.message);
          }
        }),
        check('password')
        .isStrongPassword()
        .withMessage("password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"),
   ]
];

const addUserValidationHandler=function(req,res,next){
  const error=validationResult(req);
  const mappedErrors=error.mapped();
  if(Object.keys(mappedErrors).length===0){
   next();
  }else{
    //remove uploaded file
    if(req.file.length>0){
      const {filename}=req.files[0];
      unlink(
        path.join(__dirname,`/../public/upload/avatar/${filename}`),
        (err)=>{
          if(err){
            console.log(err);
          }
        }
      )
    }
    //response the error
    res.status(500).json({
      error:mappedErrors,
    });

  }
}

module.exports={
    addUserValidator,
    addUserValidationHandler,
}