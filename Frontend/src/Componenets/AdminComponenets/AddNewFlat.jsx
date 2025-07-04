import React, { useState } from "react";
import { FaHome, FaBuilding, FaBed, FaUsers, FaPlus,FaBook  } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { toast } from "react-toastify";


function AddNewFlat({toggleAddNewFlatValue}) { 
    useEffect(()=>{
        AOS.init();
    },[])
    const [formData, setFormData] = useState({
    name: "",
    flatNumber: "",
    floorNo: "",
    beds: "",
    tenants: [],
  });

  const handleChange = (e) => {
    const {name,value}=e.target
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async () => {
    console.log(formData);
    try {
        const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/flats/addNewFlat",{
           method:"POST",
           headers:{
            "Content-Type":"application/json"
           },
           credentials:"include",
           body:JSON.stringify(formData)
        })
        const data=await res.json();
         console.log(data);
         toggleAddNewFlatValue();
         toast.success("Added new Flat Details")
    } catch (error) {
        console.log("Error in frontend while add new flat details frontend",error);
        toast.error("Error adding flat details")
    }
    

    
  };


  
  return (
    <main className='min-h-screen h-fit w-full caveat-fancy flex flex-col items-center justify-center 
    
        p-8 
    '>


       <section
                  className="bg-gradient-to-r text-[#f09b9b] bg-[#dc1dfd3a] backdrop-blur-2xl
                   p-8 rounded-2xl shadow-md text-center max-w-3xl mx-auto mb-20"
                  data-aos="fade-down"
                >
                  <p className="  lora text-[25px] sm:text-[35px] mb-6 text-lg">
                    Get All FLats Details 🏡
                  </p>
                  <button
                    onClick={toggleAddNewFlatValue}
                    className="flex items-center justify-center mx-auto gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaPlus className="text-white" />
                   Get Details
                  </button>
              </section>

       
        <section
      className=" rounded-2xl backdrop-blur-xs p-5 w-fit bg-gradient-to-r shadow-[0px_0px_5px_#f09b9b] bg-[#2a122e20]
      "
      data-aos="zoom-in"
    >
      <h2 className="text-4xl font-bold text-[#f09b9b] lora  py-2 mb-4 text-center flex items-center justify-center gap-1 sm:gap-2">
        <FaPlus className="text-[2xl] sm:text-4xl " /> Add A New Flat
      </h2>
      <form  className="space-y-4 text-md  sm:text-2xl lg:text-3xl text-white p-2 sm:p-5 gap-1 min-[450px]:gap-5 sm:gap-10 grid grid-cols-1 min-[450px]:grid-cols-2">
        <div>
          <label className="block  font-medium mb-1">
            <FaHome className="inline mr-2 " />
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border   rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block  font-medium mb-1">
            <FaBuilding className="inline mr-2 " />
            Flat Number
          </label>
          <input
            type="text"
            name="flatNumber"
            value={formData.flatNumber}
            onChange={handleChange}
            className="w-full border border-indigo-700  rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block  font-medium mb-1">
            Floor Number
          </label>
          <input
            type="number"
            name="floorNo"
            value={formData.floorNo}
            onChange={handleChange}
            className="w-full border  rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block  font-medium mb-1">
            <FaBed className="inline mr-2 text-green-500" />
            Number of Beds
          </label>
          <input
            type="number"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            className="w-full border border-indigo-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>


        
      </form>
      <button
          onClick={handleSubmit}
          className="w-fit block mx-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-10 text-2xl rounded-sm shadow transition-all duration-300 ease-in-out transform "
        >
          Add Flat
        </button>
    </section>
    </main>
  )
}

export default AddNewFlat