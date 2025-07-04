const mongoose=require("mongoose");
const TenantBedRequestSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    city: {
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    flatType: {
        type:String,
        required:true,
    },
    floor:{
        type:String,
        required:true,
    },
    buildingName: {
        type:String,
        required:true,
    },
    admissionDate:{
        type:String,
        required:true
    }
})
const TenantBedRequestModel=mongoose.model("Tenant_Bed_Requests", TenantBedRequestSchema);
module.exports=TenantBedRequestModel