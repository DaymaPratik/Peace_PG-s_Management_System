import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';
function ContactUsFormDetails() {
  const [contactUsArray, setContactArray] = useState([]);
useEffect(() => {
    AOS.init();
  }, []);


  useEffect(() => {
    const getContactUsDetailsFunction = async () => {
      try {
        const res = await fetch(
          "https://peace-pg-s-management-system.onrender.com/api/post/conatctUs/getContactFromDetails",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        const updatedArray = data.contactUsFormDetailsArray;
        setContactArray(updatedArray);
       
      } catch (error) {
        console.log("Error in geting contact details frontend", error);
       
      }
    };
    getContactUsDetailsFunction();
  }, []);




  const contactFormDeteleFunction=async(id)=>{
    try {
        const res=await fetch(`https://peace-pg-s-management-system.onrender.com/api/post/contactUs/deleteContactFromDetails/${id}`,{
           method:"DELETE",
           headers:{
            "Content-Type":"application/json"
           },
           credentials:"include",
        });
        const data=await res.json({});
        const updatedArray=contactUsArray.filter((item)=>item._id!==id);
        setContactArray(updatedArray);
        console.log(data);
        toast.success("Deleted ContactUs Form Details")
        
    } catch (error) {
        console.log("Errordeleteing contact form detail in frontend",error);
        toast.success("Error in deleting ContactUs Form Details")
    }
  }
   let delay=0;
  return (
     <main>
      <h2 className="text-4xl py-10 font-bold backdrop-blur-sm text-[#f09b9b] bg-[#00b5f234] text-center mb-6">
        All Contatct-Us Form Details
      </h2>
    <section className="min-h-[50vh] grid grid-cols-3 gap-10 p-10 h-fit w-full ">

  
      {contactUsArray.map((item, idx) => {
         delay=delay+150;
        return (
          <div
            key={idx}  data-aos="fade-left" data-aos-delay={delay}
            className="w-full h-fit max-w-md border border-gray-300 shadow-lg rounded-2xl bg-[#00ddff1f] p-5 space-y-4 text-[#f09b9b] hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-3">
              <FaUser className="text-blue-600 text-xl" />
              <p className="text-lg font-semibold">Name: {item.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-red-500 text-xl" />
              <p className="text-lg">Email: {item.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-green-600 text-xl" />
              <p className="text-lg">Mobile: {item.mobile}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaCommentDots className="text-purple-500 text-xl" />
              <p className="text-lg">Enquiry: {item.enquiry}</p>
            </div>
            <div 
            onClick={()=>{contactFormDeteleFunction(item._id)}}
            className="flex items-center space-x-3 cursor-pointer  bg-red-500 w-fit px-4 py-3 mx-auto">
              <RiDeleteBin6Line className="text-white mr-2 text-2xl" />
              Delete
            </div>
          </div>
        );
      })}
    </section>
     </main>
  );
}

export default ContactUsFormDetails;
