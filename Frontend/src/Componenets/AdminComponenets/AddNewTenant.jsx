import React, { useContext, useEffect, useState } from 'react';
import { BuildingDetailsContext } from '../../Context/BuildingContextProvider';

const AddNewTenant = () => {
  const {buildingDetailsArray}=useContext(BuildingDetailsContext);
  const [buildingNamesArray,setBuildngNamesArray]=useState([]);
  useEffect(()=>{
    const updatedArray=buildingDetailsArray.map((item)=>{
      return item.name
    })
    setBuildngNamesArray(updatedArray);
    // console.log(updatedArray);
  },[buildingDetailsArray])
  useEffect(()=>{
    console.log(buildingNamesArray);
  },[buildingNamesArray])

  const [tenantData, setTenantData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    gender: '',
    flatType: '',
    floor: '',
    bedNo: '',
    buildingName: '',
    feesAllotted: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Tenant Data:', tenantData);
    try {
      const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/addNewTenantDetails",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(tenantData)
      })
      const data=await res.json();
      console.log(data);
      if(data.success){
        setTenantData({
          name: '',
          email: '',
          mobile: '',
          address: '',
          city: '',
          state: '',
          gender: '',
          flatType: '',
          floor: '',
          bedNo: '',
          buildingName: '',
          feesAllotted: '',
          admissionDate:""
        })
      }
     
    } catch (error) {
      console.log("Error in frontend  while adding a student:",error);
    }
  };

  return (
    <section className='w-[100%] py-10'>
      <div className="w-[90%] mx-auto bg-[#00ddff1f] rounded-xl shadow-[0px_0px_5px_black]  p-10 mt-10">
      <h2 className="text-4xl border-b-4 py-2 border-green-400 w-fit mx-auto px-5 font-extrabold text-green-400 mb-6 text-center ">Add New Tenant</h2>
      <form className="rounded-xl w-[90%] mx-auto" onSubmit={handleSubmit}>
      {/* Full Name */}
    
  <section className='grid grid-cols-1 md:grid-cols-3  gap-6 p-8 w-full'>
  <div className="flex flex-col">
    <label htmlFor="name" className="text-base font-semibold text-gray-700 mb-1">Full Name</label>
    <input id="name" 
    className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
     value={tenantData.name} type="text" name="name" onChange={handleChange} required />
      </div>

  {/* Email */}
  <div className="flex flex-col">
    <label htmlFor="email" className="text-base font-semibold text-gray-700 mb-1">Email</label>
    <input
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    id="email"  value={tenantData.email} type="email" name="email" onChange={handleChange} required />
  </div>

  {/* Mobile */}
  <div className="flex flex-col">
    <label htmlFor="mobile" className="text-base font-semibold text-gray-700 mb-1">Mobile Number</label>
    <input
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    id="mobile"  value={tenantData.mobile} type="tel" name="mobile" onChange={handleChange} required />
  </div>

  {/* Address */}
  <div className="flex flex-col">
    <label htmlFor="address" className="text-base font-semibold text-gray-700 mb-1">Address</label>
    <input id="address" 
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    value={tenantData.address} type="text" name="address" onChange={handleChange} required />
  </div>

  {/* City */}
  <div className="flex flex-col">
    <label htmlFor="city" className="text-base font-semibold text-gray-700 mb-1">City</label>
    <input id="city" 
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    value={tenantData.city} type="text" name="city" onChange={handleChange} required />
  </div>

  {/* State */}
  <div className="flex flex-col">
    <label htmlFor="state" className="text-base font-semibold text-gray-700 mb-1">State</label>
    <input id="state"
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    value={tenantData.state} type="text" name="state" onChange={handleChange} required />
  </div>

  {/* Gender */}
  <div className="flex flex-col">
    <label htmlFor="gender" className="text-base font-semibold text-gray-700 mb-1">Gender</label>
    <select id="gender" name="gender" value={tenantData.gender} onChange={handleChange} 
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    required>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Flat Type */}
  <div className="flex flex-col">
    <label htmlFor="flatType" className="text-base font-semibold text-gray-700 mb-1">Flat Type</label>
    <select id="flatType" name="flatType" value={tenantData.flatType} onChange={handleChange} 
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
    required>
      <option value="">Select Flat Type</option>
      <option value="1RK">1RK</option>
      <option value="1BHK">1BHK</option>
      <option value="2BHK">2BHK</option>
      <option value="3BHK">3BHK</option>
    </select>
  </div>

  {/* Building Name */}
  <div className="flex flex-col">
    <label htmlFor="buildingName" className="text-base  font-semibold text-gray-700 mb-1">Building Name</label>
    <select id="buildingName" name="buildingName" value={tenantData.buildingName} onChange={handleChange} 
     className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400" required>
      <option value="">Select Building Name</option>
      {buildingNamesArray.map((item, idx) => (
        <option key={idx} value={item}>{item}</option>
      ))}
    </select>
  </div>



 
</section>

<section className='flex flex-wrap items-center gap-15 px-8  w-full py-2'>

{/* Floor */}
<div className="flex flex-col">
  <label htmlFor="floor" className="text-base font-semibold text-gray-700 mb-1">Floor Number</label>
  <input id="floor"
   className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
  value={tenantData.floor} type="number" name="floor" onChange={handleChange} required />
</div>

{/* Bed Number */}
<div className="flex flex-col">
  <label htmlFor="bedNo" className="text-base font-semibold text-gray-700 mb-1">Bed Number</label>
  <input id="bedNo" 
   className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
  value={tenantData.bedNo} type="text" name="bedNo" onChange={handleChange} required />
</div>



{/*Admission Date*/}
<div className="flex flex-col">
  <label htmlFor="admissionDate" className="text-base font-semibold text-gray-700 mb-1">Admission Date</label>
  <input id="admissionDate" 
   className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
  value={tenantData.admissionDate} type="date" name="admissionDate" onChange={handleChange} required />
</div>

{/* Fees Allotted */}
<div className="flex flex-col">
  <label htmlFor="feesAllotted" className="text-base font-semibold text-gray-700 mb-1">Fees Allotted (₹)</label>
  <input id="feesAllotted" 
   className="px-2 py-1 rounded-sm focus:bg-white border-1 border-blue-400 focus:outline-2 focus:border-none outline-red-400"
  value={tenantData.feesAllotted} type="number" name="feesAllotted" onChange={handleChange} required />
</div>
</section>


  {/* Submit Button */}
  <div className="col-span-1 md:col-span-2 flex justify-center mt-10">
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-3 rounded-lg shadow transition duration-300"
    >
      Add Tenant
    </button>
  </div>
</form>
</div>
    </section>
   
  );
};

export default AddNewTenant;