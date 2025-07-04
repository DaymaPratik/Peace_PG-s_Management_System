import React, { useEffect, useState } from 'react'
import { FaUser, FaEnvelope, FaPhoneAlt, FaRegCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
function ContactUs() {
  useEffect(()=>{
    AOS.init();
  },[])
  const [formDetails,setFormDetails]=useState({
    name:"",
    mobile:"",
    email:"",
    enquiry:""
  })
  const handleChange=(e)=>{
     const{value,name}=e.target;
     setFormDetails({...formDetails,[name]:value})
  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const response=await fetch("https://peace-pg-s-management-system.onrender.com/api/post/conatctUs/addFromDetails",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify(formDetails)
        })
        const data=await response.json();
        // console.log(formDetails);
        console.log(data);
        toast.success("Sent your ContactUs Form Details")
        setFormDetails({
          name:"",
          mobile:"",
          email:"",
         enquiry:""
        })
        
      } catch (error) {
        console.log("Error in frontend while submitting contact us form",error);
        toast.error("Error sending contact us form details")
      }
  }
  return (
     <main className='relative caveat-fancyFont'>
    {/* <section className='absolute w-full h-screen bg-[#0e0c0e52] top-0 left-0'>
   
    </section> */}
     <section className=' text-[#f93535]
     bg-[url("https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
     text-[35px] bg-fixed bg-center bg-cover flex flex-col gap-2 text-center justify-center items-center w-screen h-[100vh]'>
      <h1 data-aos-delay="100" data-aos="fade-up" className='lora text-[50px]'>Contact Us</h1>
      <p data-aos-delay="200" data-aos="fade-up" className='text-white'>Feel Free To Contact Us ...</p>
      <p data-aos-delay="300" data-aos="fade-up" className='text-[45px]' >We Value your Queries</p>
     </section>
   <iframe  className='w-screen h-[100vh]'  
   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.203839704135!2d73.7328154750154!3d18.60989918250109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb8b2817c673%3A0x2f771f6a41424b2f!2sMorya%20PG!5e0!3m2!1sen!2sin!4v1748847958920!5m2!1sen!2sin" 
   width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    <section className='w-full text-white h-screen flex bg-fixed justify-center items-center bg-no-repeat bg-center bg-cover 
    bg-[url("https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
    ' >
      <form 
      onSubmit={handleSubmit} 
      className="bg-[#121a1a71] backdrop-blur-[2px] text-xl shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-4xl font-bold text-center lora mb-6 text-purple-300">Contact Us</h2>

      <div className="mb-4">
        <label className="block  font-semibold mb-1">
          <div className="flex items-center gap-2">
            <FaUser />
            Full Name
          </div>
        </label>
        <input
         required
          type="text"
          name="name"
          value={formDetails.name}
          onChange={handleChange}
          className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your full name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">
          <div className="flex items-center gap-2">
            <FaEnvelope />
            Email
          </div>
        </label>
        <input
        required
          type="email"
          name="email"
          value={formDetails.email}
          onChange={handleChange}
          className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your email address"
        />
      </div>

      <div className="mb-4">
        <label className="block  font-semibold mb-1">
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            Mobile
          </div>
        </label>
        <input
        required
          type="tel"
          name="mobile"
          value={formDetails.mobile}
          onChange={handleChange}
          className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your mobile number"
        />
      </div>

      <div className="mb-4">
        <label className="block  font-semibold mb-1">
          <div className="flex items-center gap-2">
            <FaRegCommentDots />
            Enquiry
          </div>
        </label>
        <input
        required
          type="text"
          name="enquiry"
          value={formDetails.enquiry}
          onChange={handleChange}
          className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="What's your enquiry?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md transition duration-300"
      >
        Submit
      </button>
    </form>
    </section>
     </main>
  )
}

export default ContactUs