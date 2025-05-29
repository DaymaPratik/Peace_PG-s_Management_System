import { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUserShield ,FaPlus } from "react-icons/fa";
import { FaUser,  FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { PiAddressBookBold } from "react-icons/pi";
import { FaHouseChimneyUser } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";

function GetAllStaffDetails() {
   const [addNewStaff,setAddNewStaff]=useState(false)
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
      
        const [formData, setFormData] = useState({
       name: '',
       email: '',
       mobile: '',
       address: '',
       shiftTiming: '',
       staffType:""
     });

   
     const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
     };
   
     const deleteGaurdDetailFunction=async(id)=>{
          try {
           const res=await fetch(`https://peace-pg-s-management-system.onrender.com/api/admin/delete/newHousingStaff/details/${id}`,{
               method:"DELETE",
               headers:{
                   "Content-Type":"application/json"
               },
               credentials:"include",
           });
           const data=await res.json();
           console.log(data);
           const updatedArray=staffDetailsArray.filter((item)=>{
               return item._id!==id
           })
         
           setStaffDetailsArray(updatedArray)
             
          } catch (error) {
           console.log("error deletng gaurd details frontend ",error);
           
          }
     }
   
     const handleSubmit = async (e) => {
       e.preventDefault();
       console.log('Submitted Guard Details:', formData);
       try {
           const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/admin/add/newHousingStaff/details",{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
               },
               credentials:"include",
               body:JSON.stringify(formData)
           })
           const data=await res.json();
           console.log(data);
           setStaffDetailsArray((prev)=>{
            return [...prev,data.newStaffDetails]
           })
      setAddNewStaff(false); 
        setFormData({           
         name: '',
         email: '',
         mobile: '',
         address: '',
         shiftTiming: '',
        staffType: ''
      });
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
            addNewStaff
            
            ?
             <section
                     className="w-full bg-[#6f0c0c7b] text-[#fbaeae]  p-8  rounded-2xl shadow-md text-center max-w-3xl mx-auto mb-10"
                     data-aos="fade-up"
                   >
                    <h2 className="text-xl md:text-3xl font-extrabold 0 mb-2">
                       Get All Staff Members 🏡
                     </h2>
                    
                     <button
                     onClick={()=>{setAddNewStaff(!addNewStaff)}}
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
                       Add a Housing Staff Member 🏡
                     </h2>
                     <h2 className="text-xl md:text-2xl font-extrabold  mb-4">
                       Enter Staff Member Detailss 🏡
                     </h2>
                    
                     <button
                     onClick={()=>{setAddNewStaff(!addNewStaff)}}
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
              addNewStaff
            ?
            <div className="text-[#f09b9b]  w-[50%] bg-[#2a122e20]  
            backdrop-blur-md mx-auto mt-10 p-6  rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Enter Staff Member Details</h2>
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



            <div className="flex items-center text-[#f09b9b gap-3">
              <FaClock className="text-red-500" />
              <select 
              name="staffType" 
              value={formData.staffType}
               onChange={handleChange}
               className='w-full bg-[#341b1b] px-2 py-1 rounded-sm border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400 '>

                <option  value="">Select category</option>
                <option value="Cleaning">Cleaning</option>
                <option  value="Mess">Mess</option>
                <option   value="Electrician">Electrician</option>
                <option  value="Plumber">Plumber</option>
                <option  value="Carpentar">Carpentar</option>
              </select>
            </div>
    
            {/* Submit Button */}
           
          </form>
    
           <button
              onClick={handleSubmit}
              className="py-2 mt-4 bg-red-600 block w-fit mx-auto px-5 text-white rounded-lg hover:bg-red-700 transition"
            >
              Add Staff Member
            </button>
        </div>
            :
             <section>
                 <h1 
           data-aos="fade-up"
          className= "text-2xl md:text-4xl font-bold text-center text-[#f09b9b] w-full bg-[#2a122e20]  backdrop-blur-2xl py-10 mb-10 flex items-center justify-center gap-2">
            <FaHouseChimneyUser className="text-5xl text-[#ff6347]" />
            Meet Our Housing Staff
          </h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[90%]  mx-auto">
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


export default GetAllStaffDetails;