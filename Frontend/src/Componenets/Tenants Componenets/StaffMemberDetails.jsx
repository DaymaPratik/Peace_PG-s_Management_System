import { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUserShield ,FaPlus } from "react-icons/fa";
import { PiAddressBookBold } from "react-icons/pi";
import { FaHouseChimneyUser } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";

function StaffMemberDetails() {
       const [staffDetailsArray,setStaffDetailsArray]=useState([]);
       useEffect(()=>{
     const getStaffDetalsFunction = async () => {
       try {
           const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/admin/get/staffDetails",{
               method:"GET",
               headers:{
                   "Content-Type":"application/json"
               },
               credentials:"include",
           })
           const data=await res.json();
           console.log(data);
           setStaffDetailsArray(data.staffDetailsArray)
          
       } catch (error) {
           console.log("Error adding gaurd details frontend",error);
           
       }
       };
         getStaffDetalsFunction()
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
            <FaHouseChimneyUser className="text-5xl text-[#ff6347]" />
            Meet Our Housing Staff
          </h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[90%]  mx-auto">
            {staffDetailsArray?.map((guard,idx) => {
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
                 <p className=" flex items-center justify-center gap-2 mt-1">
                  < BiSolidCategory  className="text-red-500 text-[25px]" /> {guard.staffType}
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


export default StaffMemberDetails;
