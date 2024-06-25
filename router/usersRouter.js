//external imports
const express=require('express');

//internal imports
const {getUser, addUser}=require('../controller/usersController');
const decorateHtmlResponse=require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidator, addUserValidationHandler } = require('../middlewares/users/usersValidator');

const router=express.Router();

//Users page
router.get('/',decorateHtmlResponse('Users'),getUser);
//add user
router.post('/',avatarUpload,addUserValidator,addUserValidationHandler,addUser);




module.exports=router;