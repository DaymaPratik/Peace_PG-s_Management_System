const express=require('express');
const {addContactFromDetailsFunction,getContactFormDetailsFunction,deleteContactUsFormDetailFunction}=require('../Controllers/ContactUsController');
const router=express.Router();
router.post('/api/post/conatctUs/addFromDetails',addContactFromDetailsFunction)
router.get("/api/post/conatctUs/getContactFromDetails",getContactFormDetailsFunction)
router.delete("/api/post/contactUs/deleteContactFromDetails/:id",deleteContactUsFormDetailFunction)
module.exports=router;