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
     <main className="caveat-fancyFont">
      <h2 className="text-2xl min-[400px]:text-3xl sm:text-4xl py-10 lora tracking-[2px] sm:tracking-[5px] font-bold backdrop-blur-sm text-[#f09b9b] bg-[#00b5f234] text-center mb-6">
        All Contatct-Us Form Details
      </h2>
    <section className="min-h-[50vh] grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 p-5 md:p-10 h-fit w-full ">

  
      {contactUsArray.map((item, idx) => {
         delay=delay+150;
        return (
          <div
            key={idx}  data-aos="fade-left" data-aos-delay={delay}
            className="w-full h-fit backdrop-blur-xs max-w-md shadow-[0px_0px_5px_#f09b9b] text-lg xl:text-3xl sm:text-2xl  rounded-2xl 
            bg-[#1b063e1f] p-5 space-y-4 text-[#f09b9b] hover:scale-[105%] hover:shadow-[0px_0px_10px_red] transition-shadow duration-300"
          >
            <div className="flex items-center space-x-3">
              <FaUser className="text-blue-600 " />
              <p className=" font-semibold">Name: {item.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-red-500" />
              <p className="">Email: {item.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-green-600" />
              <p className="">Mobile: {item.mobile}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaCommentDots className="text-purple-500 " />
              <p className="">Enquiry: {item.enquiry}</p>
            </div>
            <div 
            onClick={()=>{contactFormDeteleFunction(item._id)}}
            className="flex items-center space-x-3 cursor-pointer rounded bg-red-500 transition
             hover:bg-[#2c1f3960] hover:shadow-[0px_0px_3px_#f09b9b] w-fit px-4 py-3 mx-auto ease-in hover:scale-[105%] ">
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
