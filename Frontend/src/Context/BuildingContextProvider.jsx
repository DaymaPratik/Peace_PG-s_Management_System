import React, { createContext, useState } from 'react'
export const BuildingDetailsContext=createContext({});
export default function BuildingContextProvider({children}) {
    const [buildingDetailsArray,setBuildingDetailsArray]=useState([]);
   const [showSideBar,setShowSidebar]=useState(false);
      const getBuildingDetailsFunction=async ()=>{
        try {
            const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/getBuildingDetails",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
            })
            const data=await res.json();
            const updatedArray=data.buildingDetailsArray
            setBuildingDetailsArray(updatedArray)
            // console.log(updatedArray);
            // console.log(buildingDetailsArray);
            
            
            
        } catch (error) {
            console.log("Error in frontend while getting building details",error);
            
        }
    }
  return (
   <BuildingDetailsContext.Provider value={{buildingDetailsArray,setBuildingDetailsArray,showSideBar,setShowSidebar
   ,getBuildingDetailsFunction}}>
    {children}
   </BuildingDetailsContext.Provider>
  )
}
