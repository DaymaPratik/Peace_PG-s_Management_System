import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaPhoneAlt, FaRegCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
function ContactUs() {
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
    <section className='w-full text-white h-screen flex bg-fixed justify-center items-center bg-no-repeat bg-center bg-cover 
    bg-[url("https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
    ' >
      <form 
      onSubmit={handleSubmit} 
      className="bg-[#121a1a71] backdrop-blur-[2px] text-xl shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-4xl font-bold text-center mb-6 text-purple-300">Contact Us</h2>

      <div className="mb-4">
        <label className="block  font-semibold mb-1">
          <div className="flex items-center gap-2">
            <FaUser />
            Full Name
          </div>
        </label>
        <input
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
  )
}

export default ContactUs