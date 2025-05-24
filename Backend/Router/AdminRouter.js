const express=require('express');
const router=express.Router();
const{adminLoginFunction,adminRegisterFunction}=require('../Controllers/AdminController')
router.post('/api/adminLogin',adminLoginFunction);
router.post('/api/adminRegister',adminRegisterFunction);
module.exports=router;