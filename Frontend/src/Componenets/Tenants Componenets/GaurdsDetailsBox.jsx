import React from 'react'
import { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUserShield ,FaPlus } from "react-icons/fa";
import { FaUser,  FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { PiAddressBookBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from 'react';
function  GaurdsDetailsBox() {
    
    const [gaurdDetailsArray,setGaurdDetailsArray]=useState([]);
    useEffect(()=>{
  const getGaurdDetalsFunction = async () => {
    try {
        const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/admin/get/gaurdDetails",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
        const data=await res.json();
        console.log(data);
        setGaurdDetailsArray(data.gaurdDetailsArray)
       
    } catch (error) {
        console.log("Error adding gaurd details frontend",error);
        
    }
    };
    getGaurdDetalsFunction()
    },[])
  

    useEffect(()=>{
        AOS.init();
    },[])
   ;
   

    let delay=0;
  return (
    <section className="min-h-screen w-full py-10 ">
    

         <section>
             <h1 
       data-aos="fade-up"
      className="text-4xl font-bold text-center text-[#f09b9b] w-full bg-[#2a122e20]  backdrop-blur-2xl py-10 mb-10 flex items-center justify-center gap-2">
        <FaUserShield className="text-5xl text-[#ff6347]" />
        Meet Our Security Guards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[90%]  mx-auto">
        {gaurdDetailsArray.map((guard,idx) => {
            delay=delay+100;
            return (
          <div 
          data-aos="fade-left" data-aos-delay={delay}
            key={idx}
            className="text-[#f09b9b] w-full bg-[#2a122e11]  backdrop-blur-xs
            rounded-2xl shadow-[0px_0px_10px_#f09b9b] hover:scale-[105%] hover:shadow-2xl 
            transition-all duration-300 p-10 text-center space-y-3"
          >
            {/* <img
              src={guard.image}
              alt={guard.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-600 mb-4 object-cover"
            /> */}
            <h2 className="text-2xl font-semibold ">{guard.name}</h2>
            <p className="0 flex items-center justify-center gap-2 mt-1">
              <FaPhoneAlt className="text-blue-600" /> {guard.mobile}
            </p>
            <p className=" flex items-center justify-center gap-2 mt-1">
              <FaEnvelope className="text-red-500" /> {guard.email}
            </p>
             <p className=" flex items-center justify-center gap-2 mt-1">
              <PiAddressBookBold className="text-red-500 text-[25px]" /> {guard.address}
            </p>
            <div className='w-full mt-3 flex gap-3 justify-center items-center'>
            <a
              href={`tel:${guard.phone}`}
              className="block bg-green-500 hover:bg-green-600 text-white px-4 
               hover:scale-105 ease-in 
              py-2 rounded-xl transition"
            >
              📞 Call Now
            </a>
              
            </div>
          </div>
        )
        })}
      </div>
         </section>
       




        
    </section>
  )
}

export default  GaurdsDetailsBox