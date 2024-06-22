//external imports
const express=require('express');

//internal imports
const {getUser}=require('../controller/usersController');

const router=express.Router();

//login page
router.get('/',getUser);


module.exports=router;