const mongoose=require('mongoose');
const TestimonialSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})
const TestimonialsModel=mongoose.model("Testimonials_Model",TestimonialSchema);
module.exports=TestimonialsModel;