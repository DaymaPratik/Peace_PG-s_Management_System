import React, { useEffect, useState } from "react";
import TenantsDetailsBox from "../Componenets/Tenants Componenets/TenantsDetailsBox";
import RequestBedForm from "../Componenets/Tenants Componenets/RequestBedForm";
import CompalinForm from "../Componenets/Tenants Componenets/CompalinForm";
import TenantsRaisedComplains from "../Componenets/Tenants Componenets/TenantsRaisedComplains";
import GaurdsDetailsBox from "../Componenets/Tenants Componenets/GaurdsDetailsBox";
import StaffMemberDetails from "../Componenets/Tenants Componenets/StaffMemberDetails";
import { ClockLoader } from "react-spinners";
import { UserContext } from "../Context/UserContextProvider";
import { useContext } from "react";
import Testimonial from "../Componenets/Tenants Componenets/Testimonial";

function TenantDashboard() {
   const { userDetailsObj } = useContext(UserContext)
   const [tenatDetailsObj, setTenantDetailsObj] = useState({
      name: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      gender: "",
      flatType: "",
      floor: "",
      bedNo: "",
      buildingName: "",
    });
const [tenatsRaisedComplaintsArray,setTenatsRaisedComplaintsArray]=useState([]);
const [isUserHasBed,setIsUserHasBed]=useState(false);
const [loading,setloading]=useState(false);
const toggleBedPresentOfUser=()=>{
  setIsUserHasBed(!isUserHasBed);
}

     const getAllRaisedComplaintsFunction = async (email)=>{
        try {
            const res=await fetch(`https://peace-pg-s-management-system.onrender.com/api/tenants/getMyRaisedComplain/${email}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data=await res.json();
            console.log(data);
            setTenatsRaisedComplaintsArray(data.allComplains)
            console.log(tenatsRaisedComplaintsArray);
            
        } catch (error) {
            console.log("Error in frontend While getting all raise compalins",error);
        }
    }
  
    useEffect(()=>{
      getTenantsFullDetailFunction(userDetailsObj.email)
      setloading(true);
    },[])

     const getTenantsFullDetailFunction = async (email) => {
    try {
      const res = await fetch(
        `https://peace-pg-s-management-system.onrender.com/api/tenant/getFullDetails/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
    //   console.log(data);
      
      
      setTenantDetailsObj(data.ifTenantExists);
      setloading(false)
       if(data.ifTenantExists){
        toggleBedPresentOfUser()
       }
       console.log(isUserHasBed);
       
    } catch (error) {
      console.log("Error in getting tenants full detail frontend", error);
    }
  };


    
  return (
    // https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
    // https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
      loading
      ?
        <section   className='caveat-fancyFont w-[100%] py-20 bg-center h-screen bg-cover bg-no-repeat bg-fixed overflow-x-hidden flex justify-center items-center
    bg-[url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] '>
       <div className="  backdrop-blur-lg flex justify-center items-center flex-col h-[100%] w-[100%] mx-auto">
         <ClockLoader
       loading={loading}
        size={120}
        color="red"
        aria-label="Loading Spinner"
        data-testid="loader" 
        
      />
      <h1 className="w-fit p-5 lora  tracking-[5px] text-[50px] text-red-500 font-bold mt-5">LOADING......</h1>
       </div>
        </section>
    
   
      :
       <section
      className='w-[100%] py-20 bg-center bg-cover bg-no-repeat bg-fixed overflow-x-hidden 
    bg-[url("https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]'
     >



        <TenantsDetailsBox tenatDetailsObj={tenatDetailsObj}  getTenantsFullDetailFunction={getTenantsFullDetailFunction}/>
      {
        isUserHasBed
        ?
        <> 
      <CompalinForm getAllRaisedComplaintsFunction={getAllRaisedComplaintsFunction}/>
      <TenantsRaisedComplains getAllRaisedComplaintsFunction={getAllRaisedComplaintsFunction} tenatsRaisedComplaintsArray={tenatsRaisedComplaintsArray} setTenatsRaisedComplaintsArray={setTenatsRaisedComplaintsArray}/>
     <StaffMemberDetails/>
      <GaurdsDetailsBox/>
      <Testimonial/>
        </>
        :
        <>
         <RequestBedForm/>
        </>
      }
     
    </section>
  );
}

export default TenantDashboard;