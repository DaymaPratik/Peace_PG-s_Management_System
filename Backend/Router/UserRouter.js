const express=require("express");
const router=express.Router();
const {userLoginFunction,userRegisterFunction}=require("../Controllers/UserController")
router.post("/api/user/register",userRegisterFunction);
router.post("/api/user/login",userLoginFunction)
module.exports=router