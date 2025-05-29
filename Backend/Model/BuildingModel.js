const mongoose=require('mongoose');
const BuildingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    floors:{
        type:String,
        required:true
    },
    flatsPerFloor:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bedsPerFloor:{
        type:Number,
        required:true
    },
    flatTypes:{
        type:Array,
        required:true
    },
    ammunities:{
        type:Array,
        required:true
    },
    totalBeds:{
        type:"String",
    },
    availableBeds:{
        type:"Number"
    },
    totalFlats:{
        type:"String",
    }
    
})
const BuildingModel=mongoose.model("BuildingDetails",BuildingSchema);
module.exports=BuildingModel;