import React, { createContext, useEffect, useState } from 'react'
export const SideBarConext=createContext(false);
function SideBarContextProvider({children}) {
    const [showSideBar,setShowSideBar]=useState(false);
   
  return (
   <SideBarConext.Provider value={{showSideBar,setShowSideBar}}>
    {children}
   </SideBarConext.Provider>
  )
}

export default SideBarContextProvider