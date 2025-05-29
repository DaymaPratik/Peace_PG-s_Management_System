const express=require("express");
const {addnewTenantDetailsFunction,getTenantsFullDetailsFuncion,bedRequestFormFunction,
    getTenantsDetaislFunction,deleteTenantDetailFunction}=require("../Controllers/TenantController")
const router=express.Router();
router.post("/api/addNewTenantDetails",addnewTenantDetailsFunction);
router.get("/api/getTenantsDetails",getTenantsDetaislFunction)
router.delete("/api/post/tenants/deleteTenantDetails/:id",deleteTenantDetailFunction)
router.get("/api/tenant/getFullDetails/:email",getTenantsFullDetailsFuncion)
router.post("/api/tenant/bedRequestForm",bedRequestFormFunction)
module.exports=router;