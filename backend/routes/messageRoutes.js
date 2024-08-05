const express=require('express');
const { protect } = require('../middlewares/authMiddleware');
const { sendMessage, allmessage } = require('../controllers/messageColtroller');

const router=express.Router();

router.route('/').post(protect,sendMessage);
router.route('/:chatId').get(protect,allmessage);

module.exports=router