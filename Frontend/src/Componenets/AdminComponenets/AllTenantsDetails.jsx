import React, { useEffect, useState } from 'react'
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCity, FaBed, FaBuilding, FaVenusMars, FaCalendarAlt, FaHome, FaLayerGroup } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
function AllTenantsDetails() {
  const [allTenantsDetailsArray,setAllTenantsDetailsArray]=useState([]);
  useEffect(()=>{
    const getTenantsDetailsArrayFunction=async()=>{
      try {
        const res=await fetch("http://localhost:8000/api/getTenantsDetails",{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        })
        const data=await res.json();
        const updatedArray=data.allTenantsDetailsArray;
        console.log(updatedArray);
        setAllTenantsDetailsArray(updatedArray)
        
      } catch (error) {
        console.log("Eorror in frontend while getting tenants details",error);
        
      }
      
    }
    getTenantsDetailsArrayFunction()
  },[])

  const tenantDetailsDeteleFunction=async(id)=>{
    try {
        const res=await fetch(`http://localhost:8000/api/post/tenants/deleteTenantDetails/${id}`,{
           method:"DELETE",
           headers:{
            "Content-Type":"application/json"
           },
           credentials:"include",
        });
        const data=await res.json({});
        const updatedArray=allTenantsDetailsArray.filter((item)=>item._id!==id);
        setAllTenantsDetailsArray(updatedArray);
        console.log(data);
        
        
    } catch (error) {
        console.log("Errordeleteing contact form detail in frontend",error);
        
    }
  }
  return (
    <section className=' border-2 w-full border-red-500 grid  
    grid-cols-3 jus gap-10 p-5 items-center justify-center'>

      {
        allTenantsDetailsArray.map((tenant,idx)=>{
          return(
            <div
            key={idx}
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:scale-[105%] transition-all duration-300 hover:shadow-2xl w-full max-w-md"
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-indigo-300 to-[#86b7efa5] p-5 text-black rounded-t-3xl">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <FaUser className="text-indigo-700" />
                {tenant.name}
              </h2>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <FaEnvelope /> {tenant.email} <FaPhoneAlt className="ml-3" /> {tenant.mobile}
              </p>
            </div>
          
            {/* Content Area */}
            <div className="p-6 bg-gradient-to-br from-[#f6e3e33e] to-[#f382ea67] text-lg text-gray-800">
              <div className="grid grid-cols-2 my-1 gap-x-4 gap-y-3">
                <div className="flex items-center gap-2">
                  <FaVenusMars className="text-pink-600" />
                  <span className="font-semibold text-gray-600">Gender:</span> {tenant.gender}
                </div>
                <div className="flex items-center gap-2">
                  <FaCity className="text-blue-500" />
                  <span className="font-semibold text-gray-600">City:</span> {tenant.city}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="font-semibold text-gray-600">State:</span> {tenant.state}
                </div>
                <div className="flex items-center gap-2">
                  <FaHome className="text-purple-500" />
                  <span className="font-semibold text-gray-600">Flat Type:</span> {tenant.flatType}
                </div>
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-orange-500" />
                  <span className="font-semibold text-gray-600">Floor:</span> {tenant.floor}
                </div>
                <div className="flex items-center gap-2">
                  <FaBed className="text-green-700" />
                  <span className="font-semibold text-gray-600">Bed No:</span> {tenant.bedNo}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-500" />
                  <span className="font-semibold text-gray-600">Admission Date:</span> {tenant.admissionDate}
                </div>
              </div>
          

              <div className="flex  my-1 items-center gap-2">
                  <FaBuilding className="text-yellow-600" />
                  <span className="font-semibold text-gray-600">Building:</span> {tenant.buildingName}
                </div>
              <div className=" flex my-1 items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold text-gray-600">Address:</span> {tenant.address}
              </div>
          
              {/* Fee Section */}
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div className="text-lg font-bold text-green-600">₹{tenant.feesAllotted}</div>
                <div className="text-sm text-gray-600">/ month</div>
              </div>

               <div 
                          onClick={()=>{tenantDetailsDeteleFunction(tenant._id)}}
                          className="flex items-center space-x-3 cursor-pointer  bg-red-500 w-fit px-4 py-3 mx-auto">
                            <RiDeleteBin6Line className="text-white mr-2 text-2xl" />
                            Delete
                          </div>
            </div>
          </div>
          )
        })
      }
    </section>
  )
}

export default AllTenantsDetails