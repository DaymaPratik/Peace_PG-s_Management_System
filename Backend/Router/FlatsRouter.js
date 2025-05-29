const express=require("express");
const router=express.Router();

const {addNewFlatDetailsFunction,getAllFlatsDetailsFunction,deleteFlatsDetailsFunction}=require('../Controllers/FlatsController')
router.post("/api/flats/addNewFlat",addNewFlatDetailsFunction);
router.get("/api/flats/getAllFlatsDetails",getAllFlatsDetailsFunction);
router.delete("/api/flats/deleteFlatDetails/:id",deleteFlatsDetailsFunction)
module.exports=router;