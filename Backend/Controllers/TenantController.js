const TenantModel=require("../Model/TenantModel");

const getTenantsDetaislFunction=async (req,res)=>{
    try {
        const allTenantsDetails=await TenantModel.find({});
        res.status(200).json({
            success:true,
            message:"added new tenant",
            allTenantsDetailsArray:allTenantsDetails
        })
    } catch (error) {
        console.log("Error in backend getting tenants detals",error);
        res.status(400).json({
            success:false,
            message:"Error in backend while geting all tenant details",
        })
    }
}
const addnewTenantDetailsFunction=async(req,res)=> {
    console.log(req.body);
   
    try {
        const newTenantDetails=await TenantModel.create(req.body);
        console.log(newTenantDetails);
        res.status(200).json({
            success:true,
            message:"added new tenant",
            newTenantDetails:newTenantDetails
        })
    } catch (error) {
        console.log("Error in backed whle add new tenant",error);
        res.status(400).json({
            success:false,
            message:"Error in backend while adding new tenant",
        })
        
    }
}

const deleteTenantDetailFunction=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedTenant=await TenantModel.deleteOne({_id:id});
        console.log(deletedTenant);
        res.status(200).json({
            success:true,
            message:"successfully deleted tenat details",
        })
    } catch (error) {
        console.log("Error in deleting tenant ,backend",error);
        res.status(400).json({
            success:false,
            message:"Error in deleting tenant ,backend"
        })
    }
}

module.exports={addnewTenantDetailsFunction,getTenantsDetaislFunction,deleteTenantDetailFunction}