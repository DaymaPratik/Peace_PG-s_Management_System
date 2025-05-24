import React, { useContext, useEffect, useState } from 'react'
import { AdminDetailsContext } from '../Context/AdminContextProvider'
import { useNavigate } from 'react-router-dom';
import Complaints from '../Componenets/AdminComponenets/Complaints';
import AddNewTenant from '../Componenets/AdminComponenets/AddNewTenant';
import AllTenantsDetails from '../Componenets/AdminComponenets/AllTenantsDetails';
import RentDetails from '../Componenets/AdminComponenets/RentDetails';
import AllBuildingDetails from '../Componenets/AdminComponenets/AllBuildingDetails';
import AddNewBuildingDetails from '../Componenets/AdminComponenets/AddNewBuildingDetails';
import ContactUsFormDetails from '../Componenets/AdminComponenets/ContactUsFormDetails';
import { BuildingDetailsContext } from '../Context/BuildingContextProvider';

function AdminDashboad() {
  const {adminDetails}=useContext(AdminDetailsContext);
  const {getBuildingDetailsFunction}=useContext(BuildingDetailsContext)
  const navigate=useNavigate();
  useEffect(()=>{
      if(!adminDetails.isLogin){
       navigate('/api/adminAuth');
      }
      getBuildingDetailsFunction();
    // console.log(buildingDetailsArray);
    
      
  },[])

  const [renderComponenet,setRenderComponenet]=useState('');
  const renderComponenetFunction=()=>{
      switch (renderComponenet) {
        case "Complaints":{
          return <Complaints/>;
        }
        case "NewTenant":{
          return <AddNewTenant/>
        }
        case "AddNewBuildingDetails":{
          return <AddNewBuildingDetails setRenderComponenet={setRenderComponenet}/>
        }
        case "AllTenantsDetails":{
          return <AllTenantsDetails/>;
        }
        case "RentDetails":{
          return <RentDetails/>
        }
        case "AllBuildingDetails":{
          return <AllBuildingDetails/>
        }
        case "ContactUsFormDetails":{
          return <ContactUsFormDetails/>
        }
        default:
          return (
          <main className='min-h-screen h-fit w-full bg-red-500 flex flex-col justify-center items-center text-[25px] font-bold'>
          <h2>Admin Dashboard</h2>
          <section className='flex justify-center items-center gap-5 px-10 py-5 '>
          <p className='w-full border-2 text-white border-black p-5 bg-[#100f0f8d]'>Beds available:50</p>
          <p className='w-full border-2 text-white border-black p-5 bg-[#100f0f8d]'>Students Present:40</p>
          </section>
          </main>
          )


        
      }
  }
  return (
  <main className='w-full'>
     <main className=' w-full bg-fixed 
     bg-[url("https://images.unsplash.com/photo-1482784160316-6eb046863ece?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
     bg-cover bg-center bg-no-repeat
     flex  items-end justify-center flex-wrap gap-5 p-10 py-20 h-fit min-h-[60vh] text-[25px] font-bold'>
      <p className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("Complaints")}}>
       All Tenants Complaints
      </p>
      <p className=' rounded shadow-[0px_0px_5px_white] h-fit cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
       onClick={()=>{setRenderComponenet("NewTenant")}}>
        Add a new Tenant
      </p>
      <p className=' rounded shadow-[0px_0px_5px_white] h-fit cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("AddNewBuildingDetails")}}
      >Add New Building Details</p>
      <p className='rounded shadow-[0px_0px_5px_white] h-fit cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("AllTenantsDetails")}}
      >Show All Tenants Details</p>
      <p className=' rounded shadow-[0px_0px_5px_white]  h-fit cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("RentDetails")}}
      >Rent Details</p>
      <p className=' rounded shadow-[0px_0px_5px_white] h-fit cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("AllBuildingDetails")}}
      >Show All Building Details</p>
      <p className=' rounded shadow-[0px_0px_5px_white] h-fit cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("ContactUsFormDetails")}}
      >Contact Us Details</p>
      <p className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white p-3 px-5 backdrop-blur-sm bg-[#100f0f2f]'
      onClick={()=>{setRenderComponenet("")}}
      >Admin Dashboard</p>
   </main>


   <main className='w-full'>
    {renderComponenetFunction()}
   </main>
  </main>
  )
}

export default AdminDashboad