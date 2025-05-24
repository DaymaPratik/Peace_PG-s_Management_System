const express=require("express");
const {addnewTenantDetailsFunction,getTenantsDetaislFunction,deleteTenantDetailFunction}=require("../Controllers/TenantController")
const router=express.Router();
router.post("/api/addNewTenantDetails",addnewTenantDetailsFunction);
router.get("/api/getTenantsDetails",getTenantsDetaislFunction)
router.delete("/api/post/tenants/deleteTenantDetails/:id",deleteTenantDetailFunction)

module.exports=router;