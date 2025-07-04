const TestimonialsModel=require('../Model/TestimonialsModel')
const addTestimonialFunction=async(req,res)=>{
    try {
        const newTestimonial=await TestimonialsModel.create(req.body);
        res.status(200).json({
            success:true,
            message:"Successfully added the testimonial"
        })
    } catch (error) {
        console.log("Error in adding a testimonials",error);
        res.status(400).json({
            success:false,
            message:"Error in adding a testimonial"
        })
        
    }
}


const getTestimonialsDetailsFunction=async(req,res)=>{
    try {
        const testimonialsDetailsArray=await TestimonialsModel.find({});
        res.status(200).json({
            success:true,
            message:"Getting all the details of testimonials",
            testimonialsDetailsArray
        })
    } catch (error) {
        console.log("Error in getting a testimonials",error);
        res.status(400).json({
            success:false,
            message:"Error in getting a testimonial"
        })
        
    }
}


const deleteTestimonialsFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const deletedTestimonial=await TestimonialsModel.findOneAndDelete({_id:id})
        res.status(400).json({
            success:false,
            message:"Successfully Deleted the Testimonials"
        })
    } catch (error) {
        console.log("Error in deleting a testimonials",error);
        res.status(400).json({
            success:false,
            message:"Error in deleting a testimonial"
        })
        
    }
}

module.exports={deleteTestimonialsFunction,getTestimonialsDetailsFunction,addTestimonialFunction}