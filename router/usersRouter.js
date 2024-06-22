//external imports
const express=require('express');

//internal imports
const {getUser}=require('../controller/usersController');
const decorateHtmlResponse=require('../middlewares/common/decorateHtmlResponse');

const router=express.Router();

//Users page
router.get('/',decorateHtmlResponse('Users'),getUser);


module.exports=router;