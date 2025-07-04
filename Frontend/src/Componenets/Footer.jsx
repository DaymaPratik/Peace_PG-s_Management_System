import React, { useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { AdminDetailsContext } from '../Context/AdminContextProvider';
import { UserContext } from '../Context/UserContextProvider';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { FaPeace } from "react-icons/fa";
import { FaHome, FaPhoneAlt, FaUserCircle, FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

function Footer() {
      const navigate=useNavigate();
  const {adminDetails,setAdminDetails}=useContext(AdminDetailsContext);
  const{userDetailsObj ,handleLogout}=useContext(UserContext);
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
    <footer className='max-sm:flex max-sm:flex-wrap max-sm:justify-evenly  sm:grid sm:grid-cols-3 caveat-fancyFont justify-items-center py-10 px-2 sm:px-5 bg-fixed items-center gap-2 sm:gap-5
     text-white bg-[#180c26]'>
         <section className="text-[17px] md:text-[20px] space-x-2 text-center"   >
           <h1 className="flex lora justify-center items-center cursor-pointer gap-2  text-[25px] md:text-[30px] lg:text-[45px] font-bold tracking-[5px]">
             <FaPeace/>
             Peace PG's</h1>
             <p>We Care For Your Living</p>
             <p>Affordable with the best Premier Experience</p>
         </section>
          <ul className="flex flex-wrap min-[400px]:flex-col justify-center font-bold  gap-4 text-[14px] md:text-[17px] lg:text-[22px] ">
    <motion.div  className='w-fit'  whileTap={{scale:0.9}}>
    <Link to="/" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
      <FaHome />
      <li>Home</li>
    </Link>
    </motion.div>

    {!adminDetails.isLogin && (
        <motion.div className='w-fit'  whileTap={{scale:0.9}}>
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
          <motion.div className='w-fit'  whileTap={{scale:0.9}}>
        <Link to="/api/userAuth"
        onClick={handleLogout}
         className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaUserCircle />
        <li>Tenant Logout</li>
      </Link>
      </motion.div>
        :
          <motion.div className='w-fit'  whileTap={{scale:0.9}}>
        <Link to="/api/userAuth" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]   hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaUserCircle />
        <li>Tenant Login</li>
        </Link>
        </motion.div>

      
    )}
    
    {adminDetails.isLogin && (
       <motion.div className='w-fit'  whileTap={{scale:0.9}}>
      <Link to="/api/adminDashboard" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]  hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
        <FaTachometerAlt />
        <li>Admin Dashboard</li>
      </Link>
      </motion.div>
    )}

    {adminDetails.isLogin ? (

      <motion.div className='w-fit'  whileTap={{scale:0.9}}> 
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
         <motion.div className='w-fit'  whileTap={{scale:0.9}}>
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
     <motion.div className='w-fit'  whileTap={{scale:0.9}}>
    <Link to="/api/tenantDashBoard" className="flex items-center gap-1 px-3 py-2  bg-[#210e4f63]  hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white]
     hover:bg-black hover:scale-[105%]  ease-in rounded transition">
         <FaTachometerAlt />
        <li>Tenant Dashoboard</li>
      </Link>
        </motion.div>

   }
  </ul>

         <section className='text-[17px] md:ext-[20px] lg:text-[25px]'>
            <p>Mobile: <span className='text-[#f09b9b]'>7028534928</span></p>
            <p>Gmail: <span className='text-[#f09b9b]'>PeacePG420@gmail.com</span></p>
            <p>Address: <span className='text-[#f09b9b]'>Mukai Nagar Hinjewadi Phase 1,Near Matoshri Food Court</span></p>
            
         </section>
    </footer>
  )
}

export default Footer