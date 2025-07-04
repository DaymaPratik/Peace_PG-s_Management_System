
const TenantBedRequestModel=require('../Model/BedRequestModel')

const bedRequestDetailsFunction=async(req,res)=>{

    try {
        const bedsRequestDetailsArray=await TenantBedRequestModel.find({});
        res.status(200).json({
            success:true,
            message:"Getting all bed request Details",
            bedsRequestDetailsArray
        })
    } catch (error) {
        console.log("Error in getting all the bed request form details backend",error);
        res.status(400).json({
            success:false,
            message:"Error in getting all the bed request form details backend"
        })
    }
}


const bedRequestFormFunction=async(req,res)=>{
    console.log(req.body);
    try {
        const newFormRequest=await TenantBedRequestModel.create(req.body);
        res.status(200).json({
            success:true,
            message:"Add bed request form details"
        })
    } catch (error) {
        console.log("Error in getting all the bed request form details backend",error);
        res.status(400).json({
            success:false,
            message:"Error in getting all the bed request form details backend"
        })
    }
}



const deleteRequestFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteRequestDetails = await TenantBedRequestModel.findOneAndDelete({_id:id});
        res.status(200).json({
            success:true,
            message:"Successfully Deleted The Bed Request Form Details"
        })
    } catch (error) {
        console.log("Error deleting request form ",error);
        res.status(400).json({
            message:"Error deleting request form ",
            success:false
        })
        
    }
}



module.exports={bedRequestDetailsFunction,bedRequestFormFunction,deleteRequestFunction}