const express=require('express');
const router=express.Router();
const {addBuildingDetailsFunction,deleteBuildingDetailsFunction,getBuildingDetailsFunction}=require("../Controllers/BuildingController");
router.post('/api/addBuildingDetails',addBuildingDetailsFunction)
router.get("/api/getBuildingDetails",getBuildingDetailsFunction)
router.delete("/api/deleteBuildingDetails/:id",deleteBuildingDetailsFunction)
module.exports=router;