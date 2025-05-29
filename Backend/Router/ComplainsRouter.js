const express=require('express');
const router=express.Router();
const {raiseComplainFumction,getRaisedComplainsFunction,deleteRaisedComplaintByTenantFunction}=require("../Controllers/ComplainsController")
router.post("/api/tenants/complainRaised",raiseComplainFumction);
router.get("/api/tenants/getMyRaisedComplain/:email",getRaisedComplainsFunction)
router.delete("/api/tenamts/deleteRaisedComplaint/:id",deleteRaisedComplaintByTenantFunction)
module.exports=router