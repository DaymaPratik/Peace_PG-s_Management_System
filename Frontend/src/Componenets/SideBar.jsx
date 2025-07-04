import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminDetailsContext } from '../Context/AdminContextProvider';
import { UserContext } from '../Context/UserContextProvider';
import { SideBarConext } from '../Context/SideBarContextProvider';
import { FaHome, FaPhoneAlt, FaUserCircle, FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';

function SideBar() {
  const navigate = useNavigate();
  const { adminDetails, setAdminDetails } = useContext(AdminDetailsContext);
  const { userDetailsObj, handleLogout } = useContext(UserContext);
  const { showSideBar  } = useContext(SideBarConext);
 

  const logoutAdminFunction = () => {
    const updatedAdminDetails = {
      email: "",
      password: "",
      adminId: "",
      isLogin: false
    };
    setAdminDetails(updatedAdminDetails);
    sessionStorage.setItem('admin', JSON.stringify(updatedAdminDetails));
    console.log("Admin logout", updatedAdminDetails);
    navigate('/api/adminAuth');
    toast.success('Admin Logout Successful');
  };

  return (
    showSideBar && (
      <motion.ul 
        initial={{ y: '100%', opacity: 0 }}
        animate={{  y:0,opacity: 1 }}
        exit={{ y:0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="flex flex-col bg-gradient-to-r from-[#621e6276] md:hidden text-white backdrop-blur-sm
         rounded-xl to-[#2e05438b] fixed top-17 right-0 px-10 justify-center w-fit h-[300px] z-20 
         caveat-fancyFont font-bold items-center gap-4 text-[20px]"
      >
        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
          >
            <FaHome />
            <li>Home</li>
          </Link>
        </motion.div>

        {!adminDetails.isLogin && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              to="/api/contactUs"
              className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
            >
              <FaPhoneAlt />
              <li>Contact Us</li>
            </Link>
          </motion.div>
        )}

        {!adminDetails.isLogin && (
          userDetailsObj.isLogin ? (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                to="/api/userAuth"
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
              >
                <FaUserCircle />
                <li>Tenant Logout</li>
              </Link>
            </motion.div>
          ) : (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                to="/api/userAuth"
                className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
              >
                <FaUserCircle />
                <li>Tenant Login</li>
              </Link>
            </motion.div>
          )
        )}

        {adminDetails.isLogin && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              to="/api/adminDashboard"
              className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
            >
              <FaTachometerAlt />
              <li>Admin Dashboard</li>
            </Link>
          </motion.div>
        )}

        {adminDetails.isLogin ? (
          <motion.li
            whileTap={{ scale: 0.9 }}
            onClick={logoutAdminFunction}
            className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
          >
            <FaSignOutAlt />
            Admin Logout
          </motion.li>
        ) : (
          !userDetailsObj.isLogin && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                to="/api/adminAuth"
                className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
              >
                <FaSignInAlt />
                <li>Admin Login</li>
              </Link>
            </motion.div>
          )
        )}

        {(!adminDetails.isLogin && userDetailsObj.isLogin) && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              to="/api/tenantDashBoard"
              className="flex items-center gap-1 px-3 py-2 bg-[#210e4f63] hover:shadow-[0px_0px_10px_#220e4f] shadow-[0px_0px_5px_white] hover:bg-black hover:scale-[105%] ease-in rounded transition"
            >
              <FaTachometerAlt />
              <li>Tenant Dashboard</li>
            </Link>
          </motion.div>
        )}
      </motion.ul>
    )
  );
}

export default SideBar;
