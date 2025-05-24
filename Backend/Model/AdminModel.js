const mongoose=require("mongoose");
const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        requrired:true
    },
    email:{
        type:String,
        requrired:true
    },
    mobile:{
        type:Number,
        requrired:true
    },
    address:{
        type:String,
        requrired:true
    },
    password:{
        type:String,
        required:true
    }
})
const AdminModel=mongoose.model("Admin_Details",AdminSchema);
module.exports=AdminModel