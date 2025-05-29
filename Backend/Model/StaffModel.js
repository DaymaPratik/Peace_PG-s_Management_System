const mongoose=require('mongoose');
const StaffSchema=new mongoose.Schema({
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
    },
    staffType:{
       type:String,
        required:true 
    }
})
const StaffModel=mongoose.model('Staff_Model',StaffSchema)
module.exports=StaffModel;