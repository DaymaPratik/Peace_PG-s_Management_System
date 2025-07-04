import React, { useEffect, useState } from 'react'
import { FaUser, FaEnvelope, FaPhoneAlt,FaDoorOpen, FaRegCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
function Testimonial() {
  useEffect(()=>{
    AOS.init();
  },[])
  const [formData,setFormData]=useState({
    name:"",
    designation:"",
    rating:"",
    description:""
  })
  const handleChange=(e)=>{
     const{value,name}=e.target;
     setFormData({...formData,[name]:value})
  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const response=await fetch("https://peace-pg-s-management-system.onrender.com/api/post/testimonials",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify(formData)
        })
        const data=await response.json();
        console.log(formData);
        console.log(data);
        toast.success("Submmitted your Feedback")
        setFormData({
           name:"",
    designation:"",
    rating:"",
    description:""
        })
        
      } catch (error) {
        console.log("Error in frontend while submitting contact us form",error);
        toast.error("Error sending your feedback")
      }
  }
  return (
     <main className='relative caveat-fancyFont'>
    {/* <section className='absolute w-full h-screen bg-[#0e0c0e52] top-0 left-0'>
   
    </section> */}
     <section className=' text-[#f93535]
     bg-[url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
     text-[35px] bg-fixed bg-center bg-cover flex flex-col gap-2 text-center justify-center items-center w-screen h-[100vh]'>
      <h1 data-aos-delay="100" data-aos="fade-up" className='lora text-[50px]'>Testimonial</h1>
      <p data-aos-delay="200" data-aos="fade-up" className='text-white'>Feel Free To Rate US...</p>
      <p data-aos-delay="300" data-aos="fade-up" className='text-[45px]' >We Value your feedback</p>
     </section>
  
    <section className='w-full text-white h-screen flex bg-fixed justify-center items-center bg-no-repeat bg-center bg-cover 
    bg-[url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
    ' >
         <section 
      className="my-10 p-5 w-full shadow-[0px_0px_7px_#2a122e14] max-w-2xl mx-auto bg-[#2a122e14] rounded-xl text-white backdrop-blur-xs  ">
        <h2 className="text-2xl lora tracking-[3px] font-bold text-center mb-4" data-aos="fade-up" data-aos-delay="100">
          📝 PG Complaint Form
        </h2>
       <form
                className="
               grid grid-cols-1 min-[450px]:grid-cols-2
               gap-y-4 p-6 caveat-fancyFont text-[20px] sm:text-[25px] mx-auto  gap-2"
              >
                <div className="flex items-center border bg-transparent p-2 rounded" data-aos="fade-left" data-aos-delay="200">
                  <FaUser className="mr-2 text-[#ff0000] text-[30px]" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full outline-none px-2 py-1 focus:bg-transparent"
                  />
                </div>
                <div className="flex items-center border p-2 rounded" data-aos="fade-left" data-aos-delay="300">
                  <FaEnvelope className="mr-2 text-[#ff0000] text-[30px]" />
                  <input
                    type="text"
                    name="designation"
                    placeholder="Your Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="w-full outline-none  px-2 py-1 focus:bg-transparent"
                  />
                </div>
      
                <div className="flex items-center border p-2 rounded" data-aos="fade-left" data-aos-delay="400">
                  <FaDoorOpen className="mr-2 text-[#ff0000] text-[30px]" />
                  <input
                    type="text"
                    name="rating"
                    placeholder="Rating out of 5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full outline-none  px-2 py-1 focus:bg-transparent"
                  />
                </div>
      
               
      
        
              </form>
      
              <div className="flex items-start border caveat-fancyFont p-2 rounded w-[90%] mx-auto mb-5 my-3" data-aos="fade-up" data-aos-delay="100">
                <FaRegCommentDots className="mr-2 mt-1 text-[#ff0000] text-[30px]" />
                <textarea
                  name="description"
                  placeholder="Describe your experinence"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full outline-none  px-2 py-1 focus:bg-transparent"
                  rows={4}
                />
              </div>
      
              <button
              data-aos="fade-up" data-aos-delay="50"
                onClick={handleSubmit}
                className="bg-blue-600 lora text-white px-4 py-2 w-fit block mx-auto rounded hover:bg-blue-700 transition"
              >
                Submit Testimonial
              </button>
            </section>
    </section>
     </main>
  )
}

export default Testimonial