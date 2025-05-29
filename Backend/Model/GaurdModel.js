const mongoose=require('mongoose');
const GaurdSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    shiftTiming:{
         type:String,
        required:true
    }
})
const GaurdModel=mongoose.model('Gaurd_Model',GaurdSchema)
module.exports=GaurdModel;