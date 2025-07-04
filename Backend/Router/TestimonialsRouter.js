const express=require("express");
const router=express.Router();
const {deleteTestimonialsFunction,getTestimonialsDetailsFunction,addTestimonialFunction}=require("../Controllers/TestimonialsController")
router.post('/api/post/testimonials',addTestimonialFunction);
router.get("/api/get/testimonialsDetails",getTestimonialsDetailsFunction);
router.delete('/api/delete/testimonials',deleteTestimonialsFunction);
module.exports=router;