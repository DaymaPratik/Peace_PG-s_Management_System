import  { useEffect, useState } from 'react'
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCity, FaBed, FaBuilding, FaVenusMars, FaCalendarAlt, FaHome, FaLayerGroup } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoHome } from "react-icons/io5";
function AllTenantsDetails() {
  const [allTenantsDetailsArray,setAllTenantsDetailsArray]=useState([]);
  useEffect(()=>{
    const getTenantsDetailsArrayFunction=async()=>{
      try {
        const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/getTenantsDetails",{
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
        const res=await fetch(`https://peace-pg-s-management-system.onrender.com/api/post/tenants/deleteTenantDetails/${id}`,{
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
        toast.success("Deleted Tenant Details")
        
    } catch (error) {
        console.log("Errordeleteing contact form detail in frontend",error);
        toast.error("Error Deleteing tenants details")
    }
  }
  return (

   <main className=''>
      <h2 className='text-center bg-gradient-to-r text-[#f09b9b] from-[#360c6561] to-[#00b5f269]  py-10 font-black text-6xl'>All Tenants Details</h2>
    <section className='  w-full  grid  
    grid-cols-1 md:grid-cols-2  gap-10 p-5  py-10 items-center justify-items-center '>
    
      {
        allTenantsDetailsArray.map((tenant,idx)=>{
          return(
            <div
            key={idx}
            className="relative  font-bold
          text-[#f09b9b]  from-[#360c6561] to-[#00b5f269]   backdrop-blur-md shadow-[0px_0px_20px_#f09b9b] rounded-3xl hover:scale-[105%] 
          w-[95%] lg:w-[85%] text-[26px] transition-all duration-300 hover:shadow-2xl  "
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[#0e677b78] to-[#5101ff67] p-5  rounded-t-3xl">
              <h2 className="text-2xl lg:text-3xl font-bold flex items-center gap-2 mb-3">
                <FaUser className=" text-[20px] lg:text-[25px]" />
                {tenant.name}
              </h2>
              <p className="text-sm opacity-90  font-bold flex items-center gap-2">
                <FaEnvelope /> {tenant.email} <FaPhoneAlt className="ml-3" /> {tenant.mobile}
              </p>
            </div>
          
            {/* Content Area */}
            <div className="p-2 text-[14px] lg:text-[17px] ">
              <div className="grid grid-cols-2  my-1 gap-x-2  gap-y-2">
                <div className="flex items-center gap-2">
                  <FaVenusMars className= "text-[25px] lg:text-[30px] text-pink-600" />
                  <span className="font-semibold ">Gender:</span> {tenant.gender}
                </div>
                <div className="flex items-center gap-2">
                  <FaCity className="text-blue-500 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">City:</span> {tenant.city}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">State:</span> {tenant.state}
                </div>
                <div className="flex items-center gap-2 ]">
                  <FaHome className="text-purple-500 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">Flat Type:</span> {tenant.flatType}
                </div>
                <div className="flex items-center gap-2 ">
                  <IoHome className="text-purple-500 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">Flat Number:</span> {tenant.flatNumber}
                </div>
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-orange-500 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">Floor:</span> {tenant.floor}
                </div>
                <div className="flex items-center gap-2">
                  <FaBed className="text-green-700 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">Bed No:</span> {tenant.bedNo}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-500 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">Admission Date:</span> {tenant.admissionDate}
                </div>
              </div>
          

              <div className="flex items-center my-2 gap-2">
                  <FaBuilding className="text-yellow-600 text-[25px] lg:text-[30px]" />
                  <span className="font-semibold ">Building:</span> {tenant.buildingName}
                </div>
              <div className=" flex  items-center my-2 gap-2">
                <FaMapMarkerAlt className="text-red-500 text-[25px] lg:text-[30px]" />
                <span className="font-semibold ">Address:</span> {tenant.address}
              </div>
          
              {/* Fee Section */}
              <div className="mt-6 flex items-center px-5 justify-center border-t pt-4">
                <div className="text-[30px] font-bold text-green-600">₹{tenant.feesAllotted}</div>
                <div className="text-[25px] ">/ month</div>
              </div>

               <div 
                          onClick={()=>{tenantDetailsDeteleFunction(tenant._id)}}
                          className="flex items-center space-x-3 mt-3 cursor-pointer  bg-red-500 w-fit px-4 py-3 mx-auto">
                            <RiDeleteBin6Line className="text-white mr-2 text-2xl" />
                            Delete
                          </div>
            </div>
          </div>
          )
        })
      }
    </section>
   </main>
  )
}

export default AllTenantsDetails