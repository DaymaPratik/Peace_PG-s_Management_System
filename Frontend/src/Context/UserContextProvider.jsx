import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [userDetailsObj, setUserDetailsObj] = useState(() => {
    const storedData = sessionStorage.getItem("user-details");
    return storedData
      ? JSON.parse(storedData)
      : { name: "", email: "", password: "", isLogin: false };
  });

  // 🔁 Sync sessionStorage whenever userDetailsObj changes
  useEffect(() => {
    if (userDetailsObj.isLogin) {
      sessionStorage.setItem("user-details", JSON.stringify(userDetailsObj));
    } else {
      sessionStorage.removeItem("user-details");
    }
  }, [userDetailsObj]);


  const handleLogout = () => {
    setUserDetailsObj({
      name: "",
      email: "",
      password: "",
      isLogin: false
    });
    toast.success("Logged out successfully");
    navigate("/login"); 
  };

  return (
    <UserContext.Provider value={{ userDetailsObj, setUserDetailsObj ,handleLogout}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
