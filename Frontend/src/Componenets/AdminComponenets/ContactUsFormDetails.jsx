import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function ContactUsFormDetails() {
  const [contactUsArray, setContactArray] = useState([]);



  useEffect(() => {
    const getContactUsDetailsFunction = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/post/conatctUs/getContactFromDetails",
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
        const res=await fetch(`http://localhost:8000/api/post/contactUs/deleteContactFromDetails/${id}`,{
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
        
        
    } catch (error) {
        console.log("Errordeleteing contact form detail in frontend",error);
        
    }
  }
  return (
    <section className="min-h-[50vh] grid grid-cols-3 gap-10 p-10 h-fit w-full bg-[#ee8f8f8d]">
      {contactUsArray.map((item, idx) => {
        return (
          <div
            key={idx}
            className="w-full h-fit max-w-md border border-gray-300 shadow-lg rounded-2xl bg-white p-5 space-y-4 text-gray-800 hover:shadow-2xl transition-shadow duration-300"
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
  );
}

export default ContactUsFormDetails;
