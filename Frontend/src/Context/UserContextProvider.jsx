import React, { createContext, useState } from 'react'
export const UserContext=createContext({});
function UserContextProvider( {children} ) {
  const [userDetails,setUserDetails]=useState({
    name:"",
    email:"",
    moble:"",
    address:"",
    password:""
  })
  return (
    <UserContext.Provider value={{userDetails,setUserDetails}}>

       {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider