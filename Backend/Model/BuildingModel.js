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
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bedsPerFloor:{
        type:String,
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
    }
    
})
const BuildingModel=mongoose.model("BuildingDetails",BuildingSchema);
module.exports=BuildingModel;