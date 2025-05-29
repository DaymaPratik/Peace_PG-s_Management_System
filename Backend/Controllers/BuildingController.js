const BuildingModel=require("../Model/BuildingModel")
const TenantModel=require('../Model/TenantModel')
const addBuildingDetailsFunction=async(req,res)=>{
    console.log("REQUEST BODY",req.body);
    const {name,floors,flatsPerFloor,address,bedsPerFloor,flatTypes,ammunities}=req.body
    
    if(!(name && floors && flatsPerFloor && address && bedsPerFloor && flatTypes && ammunities)){
        return res.status(404).json({
            success:false,
            message:"All feilds required"
        })
    }
    try {
        console.log(typeof bedsPerFloor , typeof floors);
        const totalBeds=parseInt(floors)*parseInt(bedsPerFloor);
        const totalFlats=parseInt(floors)*parseInt(flatsPerFloor)
        const createNewBuilding=await BuildingModel.create({name,floors,flatsPerFloor,address,ammunities,totalBeds,bedsPerFloor,flatTypes,totalFlats,availableBeds:totalBeds});
        res.status(200).json({
        success:true,
        message:"Added building details in db",
        buildingDetails:createNewBuilding
        })
    } catch (error) {
        console.log("Error in backend while adding building details",error);
        res.status(400).json({
            success:false,
            message:"Error in backend while adding building details"
        })
    }
}

const getBuildingDetailsFunction=async (req,res)=>{
    try {
        const buildingDetailsArray=await BuildingModel.find({});
        res.status(200).json({
            success:true,
            message:"Got the building details",
            buildingDetailsArray:buildingDetailsArray
        })
        
    } catch (error) {
        console.log("Error in backed while getting building details from db",error);
        res.status(400).json({
            success:false,
            message:"Error in backed while getting building details from db"
        })
    }
}
const deleteBuildingDetailsFunction=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedBuildingDetails=await BuildingModel.deleteOne({_id:id})
        res.status(200).json({
            success:true,
            message:"deleted the building details",
        })
    } catch (error) {
        console.log("Error deleting buildng details backend",error);
        res.status(400).json({
            success:false,
            messagse:"Error deleting buildng details backend"
        })
    }
}
module.exports={addBuildingDetailsFunction,deleteBuildingDetailsFunction,getBuildingDetailsFunction}