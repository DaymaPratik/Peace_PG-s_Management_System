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
import GetAllFlatsDetails from '../Componenets/AdminComponenets/GetAllFlatsDetails';
import GetGaurdsDetails from '../Componenets/AdminComponenets/GetGaurdsDetails';
import GetAllStaffDetails from '../Componenets/AdminComponenets/GetAllStaffDetails';
import AOS from "aos";
import "aos/dist/aos.css";

function AdminDashboad() {
  const {adminDetails}=useContext(AdminDetailsContext);
  const {getBuildingDetailsFunction}=useContext(BuildingDetailsContext)
  const navigate=useNavigate();
  useEffect(()=>{
    AOS.init();
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
          return <AddNewTenant setRenderComponenet={setRenderComponenet}/>
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
          return <AllBuildingDetails setRenderComponenet={setRenderComponenet}/>
        }
        case "ContactUsFormDetails":{
          return <ContactUsFormDetails/>
        }
        case "GetAllFlatDetails":{
           return <GetAllFlatsDetails/>
        }
        default:
      }
          return (
        
          <main className=' min-h-screen h-fit bg-fixed overflow-x-hidden
     bg-[url("https://images.pexels.com/photos/30081947/pexels-photo-30081947/free-photo-of-mesmerizing-view-of-the-orion-nebula.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
     bg-cover bg-center bg-no-repeat'> 
         <GetGaurdsDetails/>
         <GetAllStaffDetails/>
          </main>
         

          )


        
      }
  

      let delay=100;


  return (
  <main className='w-full min-h-screen h-fit overflow-x-hidden bg-fixed 
     bg-[url("https://images.pexels.com/photos/30081947/pexels-photo-30081947/free-photo-of-mesmerizing-view-of-the-orion-nebula.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
     bg-cover bg-center bg-no-repeat'>
     <main className=' w-full 
     flex  flex-wrap gap-5 px-5 md:px-10 py-30 h-fit  sm:min-h-[60vh] text-[9px] min-[500px]:text-[12px] sm:text-[15px] md:text-[18px] lg:text-[25px] font-bold'>


      <p
      data-aos="fade-up" data-aos-delay={delay+100}
      className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
      bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("Complaints")}}>
       1. All Tenants Complaints
      </p>
      
      <p 
      data-aos="fade-up" data-aos-delay={delay+200}
      className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
      
      bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("AddNewBuildingDetails")}}
      >2. Add New Building Details</p>
       <p
       data-aos="fade-up" data-aos-delay={delay+300}
       className='rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
        bg-[#6718fb63] hover:bg-[#ff00004e]]'
      onClick={()=>{setRenderComponenet("AllBuildingDetails")}}
      >3. Get All Building Details</p>
      <p
      data-aos="fade-up" data-aos-delay={delay+400}
      className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
       bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("GetAllFlatDetails")}}
      >4. Get All Flats Details</p>
      <p 
      data-aos="fade-up" data-aos-delay={delay+500}
      className='rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
       bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("AllTenantsDetails")}}
      >5. Get All Tenants Details</p>
      <p
      data-aos="fade-up" data-aos-delay={delay+600}
      className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
       bg-[#6718fb63] hover:bg-[#ff00004e]'
       onClick={()=>{setRenderComponenet("NewTenant")}}>
        6. Add a new Tenant
      </p>
      <p 
      data-aos="fade-up" data-aos-delay={delay+700}
      className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
       bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("RentDetails")}}
      >7. Rent Details</p>
     
      <p
      data-aos="fade-up" data-aos-delay={delay+800}
      className='rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
       bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("ContactUsFormDetails")}}
      >8. Contact Us Details</p>
      <p 
      data-aos="fade-up" data-aos-delay={delay+900}
      className=' rounded shadow-[0px_0px_5px_white] h-fit  cursor-pointer text-white hover:shadow-[0px_0px_5px_red] p-3 px-2 hover:scale-[105%] transition ease-in md:px-5 backdrop-blur-md
       bg-[#6718fb63] hover:bg-[#ff00004e]'
      onClick={()=>{setRenderComponenet("")}}
      >9. Admin Dashboard</p>
   </main>


   <main className='w-full min-h-screen h-fit
    '>
    {renderComponenetFunction()}
   </main>
  </main>
  )
}

export default AdminDashboad