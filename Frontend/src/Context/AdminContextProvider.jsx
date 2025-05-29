import React, { createContext,  useEffect,  useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const AdminDetailsContext=createContext({});
function AdminContextProvider({children}) {
   
    const [adminDetails,setAdminDetails]=useState(()=>{
      const adminDetails=JSON.parse(sessionStorage.getItem('admin')) 
        return adminDetails ? adminDetails :{
           email:"",
           password:"",
           adminId:"",
           isLogin:false,
         }
    })
    
    useEffect(() => {
      sessionStorage.setItem("admin", JSON.stringify(adminDetails));
    }, [adminDetails]);
   
  return (
    <AdminDetailsContext.Provider value={{adminDetails,setAdminDetails}}>
       {children}
    </AdminDetailsContext.Provider>
  )
}

export default AdminContextProvider