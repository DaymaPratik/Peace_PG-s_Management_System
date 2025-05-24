const mongoose=require('mongoose');
const ContactUsFormSchema=new mongoose.Schema({
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
    enquiry:{
        type:String,
        required:true
     }
    
})
const ContactUsFromModel=mongoose.model("ContactUsFormDetails",ContactUsFormSchema);
module.exports=ContactUsFromModel