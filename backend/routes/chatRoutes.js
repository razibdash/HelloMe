const express=require('express');
const { protect } = require('../middlewares/authMiddleware');

const router=express.Router();


router.route("/").post(protect);
router.route("/").post(protect);
router.route("/group").post(protect);
router.route("/rename").put(protect);
router.route("/groupremove").delete(protect);
router.route("/groupadd").post(protect);


module.exports=router;