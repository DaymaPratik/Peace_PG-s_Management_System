import React from 'react'
import { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUserShield ,FaPlus } from "react-icons/fa";
import { FaUser,  FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { PiAddressBookBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from 'react';
function GetGaurdsDetails() {
     const [addNewgaurd,setAddNewGaurd]=useState(false)
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
        setAddNewGaurd(false)
    } catch (error) {
        console.log("Error adding gaurd details frontend",error);
        
    }
    };
    getGaurdDetalsFunction()
    },[])
  
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    shiftTiming: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteGaurdDetailFunction=async(id)=>{
       try {
        const res=await fetch(`https://peace-pg-s-management-system.onrender.com/api/admin/delete/guard/details/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        });
        const data=await res.json();
        console.log(data);
        const updatedArray=gaurdDetailsArray.filter((item)=>{
            return item._id!==id
        })
      
        setGaurdDetailsArray(updatedArray)
          
       } catch (error) {
        console.log("error deletng gaurd details frontend ",error);
        
       }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Guard Details:', formData);
    try {
        const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/admin/add/gaurd/details",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(formData)
        })
        const data=await res.json();
        console.log(data);
        setGaurdDetailsArray((prev)=>{
            return [...prev,data.newGaurdDetails]
           })
        setAddNewGaurd(false)
    } catch (error) {
        console.log("Error adding gaurd details frontend",error);
        
    }
  };

    useEffect(()=>{
        AOS.init();
    },[])
   ;
   

    let delay=0;
  return (
    <section className="min-h-screen w-full py-10 ">
     
      {
         addNewgaurd
         
         ?
         <section
                 className="w-full bg-[#6f0c0c7b] text-[#fbaeae]  p-8  rounded-2xl shadow-md text-center max-w-3xl mx-auto mb-10"
                 data-aos="fade-up"
               >
                 <h2 className="text-3xl font-extrabold 0 mb-4">
                  Get All Guards Details 🏡
                 </h2>
                
                 <button
                 onClick={()=>{setAddNewGaurd(!addNewgaurd)}}
                   className="flex items-center justify-center w-fit mx-auto 
                   gap-2 bg-[#f09b9b] hover:bg-[#ff6347] text-white font-semibold py-2 px-6 rounded-full
                    shadow transition-all duration-300 ease-in-out transform hover:scale-105"
                 >
                   <FaPlus className="text-white" />
                  Get Details
                 </button>
        </section> 
         :
         <section
                 className="w-full bg-[#6f0c0c7b] text-[#fbaeae]  p-8  rounded-2xl shadow-md text-center max-w-3xl mx-auto mb-10"
                 data-aos="fade-up"
               >
                <h2 className="text-xl md:text-3xl font-extrabold  mb-2">
                   Need to increase security 🏡
                 </h2>
                 <h2 className="text-lg md:text-xl font-extrabold  mb-2">
                   Add New Gaurd Details 🏡
                 </h2>
                
                 <button
                 onClick={()=>{setAddNewGaurd(!addNewgaurd)}}
                   className="flex items-center justify-center w-fit mx-auto 
                   gap-2 bg-[#f09b9b] hover:bg-[#ff6347] text-white font-semibold py-2 px-6 rounded-full
                    shadow transition-all duration-300 ease-in-out transform hover:scale-105"
                 >
                   <FaPlus className="text-white" />
                   Add Details
                 </button>
        </section> 
      }



      {
          addNewgaurd
        ?
        <div className="text-[#f09b9b]  w-[50%] bg-[#2a122e20]  
        backdrop-blur-md mx-auto mt-10 p-6  rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Guard Details</h2>
      <form className="grid grid-cols-2  gap-5">

        {/* Name */}
        <div className="flex items-center gap-3">
          <FaUser className="text-red-500" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-red-500" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3">
          <FaPhone className="text-red-500"/>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-500" />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Shift Timing */}
        <div className="flex items-center gap-3">
          <FaClock className="text-red-500" />
          <input
            type="text"
            name="shiftTiming"
            placeholder="Shift Timing (e.g., 9AM - 6PM)"
            value={formData.shiftTiming}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
       
      </form>

       <button
          onClick={handleSubmit}
          className="py-2 mt-4 bg-red-600 block w-fit mx-auto px-5 text-white rounded-lg hover:bg-red-700 transition"
        >
          Add Guard
        </button>
    </div>
        :
         <section>
             <h1 
       data-aos="fade-up"
      className="text-2xl md:text-4xl font-bold text-center text-[#f09b9b] w-full bg-[#2a122e20]  backdrop-blur-2xl py-10 mb-10 flex items-center justify-center gap-2">
        <FaUserShield className="text-5xl text-[#ff6347]" />
        Meet Our Security Guards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[90%]  mx-auto">
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
              📞 
            </a>
            <button
            onClick={()=>{deleteGaurdDetailFunction(guard._id)}}
            className='px-4 py-2 bg-red-500 hover:bg-red-800 hover:scale-105 transition ease-in rounded-xl
             text-[25px] flex justify-center items-center gap-3 text-white'>
            <MdDeleteForever className='text-white' />
            </button>
            </div>
          </div>
        )
        })}
      </div>
         </section>
       }




        
    </section>
  )
}

export default GetGaurdsDetails