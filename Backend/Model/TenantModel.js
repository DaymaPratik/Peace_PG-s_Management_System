const mongoose=require("mongoose");
const TenantSchema=new mongoose.Schema({
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
    bedNo: {
        type:String,
        required:true,
    },
    buildingName: {
        type:String,
        required:true,
    },
    feesAllotted:{
        type:String,
        required:false
    },
    admissionDate:{
        type:String,
        required:true
    }
})
const TenantModel=mongoose.model("Tenant_Details",TenantSchema);
module.exports=TenantModel