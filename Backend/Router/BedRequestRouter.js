const express=require('express');
const router=express.Router();
const {bedRequestDetailsFunction,bedRequestFormFunction,deleteRequestFunction}=require('../Controllers/RequestFormController');
router.get('/api/get/bedRequestDetails',bedRequestDetailsFunction);
router.post('/api/post/bedRequest',bedRequestFormFunction);
router.delete('/api/delete/bedRequest/:id',deleteRequestFunction)
module.exports=router;