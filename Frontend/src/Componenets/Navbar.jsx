import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AdminDetailsContext } from '../Context/AdminContextProvider';
import { FaHome, FaPhoneAlt, FaUserCircle, FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
import { FaPeace } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { UserContext } from '../Context/UserContextProvider';
import { MdCancelPresentation } from "react-icons/md";
import { motion } from 'framer-motion';

import { SideBarConext } from '../Context/SideBarContextProvider';
function Navbar() {
  const navigate=useNavigate();
  const {showSideBar,setShowSideBar}=useContext(SideBarConext)
  const {adminDetails,setAdminDetails}=useContext(AdminDetailsContext);
  const{userDetailsObj ,handleLogout}=useContext(UserContext);
  useEffect(()=>{
   
  },[])
  const logoutAdminFunction=()=>{
      const updatedAdminDetails={
        email:"",
        password:"",
        adminId:"",
        isLogin:false
      }
      setAdminDetails(updatedAdminDetails)
      sessionStorage.setItem('admin',JSON.stringify(updatedAdminDetails));
      console.log("Admin logout",updatedAdminDetails);
      navigate('/api/adminAuth')
      toast.success('Admin Logout Successfull')
      
  }
  return (
    

<nav className="flex caveat-fancyFont justify-between backdrop-blur-sm z-[100] fixed w-full items-center px-2 lg:px-6 py-2 
bg-gradient-to-r  from-[#f14ef18b]  to-[#5309788b]  text-white shadow-md">
  <section className="flex items-center space-x-2">
    {/* <img src="" alt="" width={50} /> */}
    <h1 className="flex lora justify-center items-center cursor-pointer gap-2 text-[30px] lg:text-[40px] font-bold tracking-[5px]">
      <FaPeace/>
      Peace PG's</h1>
  </section>

 
     <ul className="flex justify-center font-bold items-center gap-4 text-[17px] lg:text-[22px] max-md:hidden">
    <motion.div  whileTap={{scale:0.9}}>
    <Link to="/" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
      <FaHome />
      <li>Home</li>
    </Link>
    </motion.div>

    {!adminDetails.isLogin && (
        <motion.div  whileTap={{scale:0.9}}>
      <Link to="/api/contactUs" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
      <FaPhoneAlt />
      <li>Contact Us</li>
    </Link>
    </motion.div>
    )}

    {!adminDetails.isLogin && (
      
        userDetailsObj.isLogin
        ?
          <motion.div  whileTap={{scale:0.9}}>
        <Link to="/api/userAuth"
        onClick={handleLogout}
         className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaUserCircle />
        <li>Tenant Logout</li>
      </Link>
      </motion.div>
        :
          <motion.div  whileTap={{scale:0.9}}>
        <Link to="/api/userAuth" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaUserCircle />
        <li>Tenant Login</li>
        </Link>
        </motion.div>

      
    )}
    
    {adminDetails.isLogin && (
       <motion.div  whileTap={{scale:0.9}}>
      <Link to="/api/adminDashboard" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]  hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaTachometerAlt />
        <li>Admin Dashboard</li>
      </Link>
      </motion.div>
    )}

    {adminDetails.isLogin ? (

      <motion.div whileTap={{scale:0.9}}> 
        <li
        onClick={logoutAdminFunction}
        className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition"
      >
        <FaSignOutAlt />
        Admin Logout
      </li>
      </motion.div>
    ) : (
     
      !userDetailsObj.isLogin &&(
         <motion.div  whileTap={{scale:0.9}}>
         <Link to="/api/adminAuth" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]  ] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaSignInAlt />
        <li>Admin Login</li>
      </Link>
      </motion.div>
      )
     
    )}


   {
    (!adminDetails.isLogin && userDetailsObj.isLogin )
    &&
     <motion.div  whileTap={{scale:0.9}}>
    <Link to="/api/tenantDashBoard" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]  hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
         <FaTachometerAlt />
        <li>Tenant Dashoboard</li>
      </Link>
        </motion.div>

   }
  </ul>


  <motion.div 
  whileTap={{scale:0.9}}
  onClick={()=>{
      console.log(showSideBar);
      setShowSideBar(!showSideBar)
    }}
  className='w-fit p-3 bg-[#3d206892] md:hidden shadow-[0px_0px_10px_black]
   hover:bg-black transition 
   hover:scale-[105%] hover:shadow-[0px_0px_5px_#f09b9b] ease-in'>
   {
    showSideBar 
    ?
    <MdCancelPresentation className='text-[30px]'/>
    :
     <BiSolidFoodMenu className='text-[30px]'/>
   }
  </motion.div>
      

</nav>
  )
}

export default Navbar