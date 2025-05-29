const mongoose=require('mongoose');
const ComplainSchema=new mongoose.Schema({
    name: {
    type:String,
    required:true
    },
    email: {
     type:String,
    required:true
    },
    roomNumber: {
     type:String,
    required:true
    },
    category: {
type:String,
    required:true
    },
    urgency:{
type:String,
    required:true
    } ,
    description: {
type:String,
    required:true
    },
})
const ComplainModel=mongoose.model("Complains_Details",ComplainSchema)
module.exports=ComplainModel