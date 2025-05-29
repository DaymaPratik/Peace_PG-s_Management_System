const FlatDetailsModel=require("../Model/FlatsModel")
const BuildingModel=require('../Model/BuildingModel')
const addNewFlatDetailsFunction=async(req,res)=>{
    console.log(req.body);
try {
    const {flatNumber}=req.body;
    const ifFlatAlreadyExists=await FlatDetailsModel.findOne({flatNo:flatNumber});
    if(ifFlatAlreadyExists){
        res.status(400).json({
            success:false,
            message:"This Flat is already Existing"
        })
        
    }
    const createNewFlatDetails=await FlatDetailsModel.create(req.body);
        res.status(200).json({
            success:true,
            message:"Added new Flat",
            createNewFlatDetails:createNewFlatDetails
        })
        
} catch (error) {
    console.log("Error creating new flat in backend",error);
     res.status(400).json({
            success:false,
            message:"Error creating new flat in backend"
        })
}
}
const getAllFlatsDetailsFunction =async(req,res)=>{
try {
    const flatsDetailsArray=await FlatDetailsModel.find({});
    res.status(200).json({
            success:true,
            message:"getting all Flats details",
            flatsDetailsArray:flatsDetailsArray
        })
} catch (error) {
      console.log("Error in getting flats details",error);
     res.status(400).json({
            success:false,
            message:"Error in getting flats details in backend"
        })
}
}


const deleteFlatsDetailsFunction =async(req,res)=>{
try {
    const {id}=req.params
    const deletedFlatDetails=await FlatDetailsModel.findOneAndDelete({_id:id});
    res.status(200).json({
            success:true,
            message:"DeletedFlats details",
        })
} catch (error) {
      console.log("Error in deleting flats details",error);
     res.status(400).json({
            success:false,
            message:"Error in deleting flats details in backend"
        })
}
}
module.exports={addNewFlatDetailsFunction,getAllFlatsDetailsFunction,deleteFlatsDetailsFunction}