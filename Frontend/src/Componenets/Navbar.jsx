import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AdminDetailsContext } from '../Context/AdminContextProvider';
import { FaHome, FaPhoneAlt, FaUserCircle, FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

function Navbar() {
  const navigate=useNavigate();
  const {adminDetails,setAdminDetails}=useContext(AdminDetailsContext);
  useEffect(()=>{
    // console.log(adminDetails);
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
      
  }
  return (
    

<nav className="flex justify-between z-[100] fixed w-full items-center px-6 py-4 
bg-gradient-to-r  from-[#2b29298b]  to-[#ee24248b]  text-white shadow-md">
  <section className="flex items-center space-x-2">
    {/* <img src="" alt="" width={50} /> */}
    <h1 className="text-2xl font-bold tracking-wider">Peace PG's</h1>
  </section>

  <ul className="flex justify-center font-bold items-center gap-4 text-[20px]">
    <Link to="/" className="flex items-center gap-1 px-3 py-2 border-1 border-white hover:bg-white hover:text-black rounded transition">
      <FaHome />
      <li>Home</li>
    </Link>

    <Link to="/api/contactUs" className="flex items-center gap-1 border-1 border-white px-3 py-2 hover:bg-white hover:text-black rounded transition">
      <FaPhoneAlt />
      <li>Contact Us</li>
    </Link>

    {!adminDetails.isLogin && (
      <Link to="/api/userAuth" className="flex items-center gap-1 px-3 border-1 border-white py-2 hover:bg-white hover:text-black rounded transition">
        <FaUserCircle />
        <li>Tenant Login</li>
      </Link>
    )}

    {adminDetails.isLogin && (
      <Link to="/api/adminDashboard" className="flex items-center border-1 border-white gap-1 px-3 py-2 hover:bg-white hover:text-black rounded transition">
        <FaTachometerAlt />
        <li>Admin Dashboard</li>
      </Link>
    )}

    {adminDetails.isLogin ? (
      <li
        onClick={logoutAdminFunction}
        className="flex items-center gap-1 px-3 py-2 border-1 border-white hover:bg-white hover:text-black rounded cursor-pointer transition"
      >
        <FaSignOutAlt />
        Admin Logout
      </li>
    ) : (
      <Link to="/api/adminAuth" className="flex items-center border-1 border-white gap-1 px-3 py-2 hover:bg-white hover:text-black rounded transition">
        <FaSignInAlt />
        <li>Admin Login</li>
      </Link>
    )}
  </ul>
</nav>
  )
}

export default Navbar