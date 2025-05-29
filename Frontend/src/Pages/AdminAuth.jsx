import React, { useContext } from 'react'
import { AdminDetailsContext } from '../Context/AdminContextProvider';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
function AdminAuth() {
    const {adminDetails,setAdminDetails}=useContext(AdminDetailsContext);
    const navigate=useNavigate();
    // console.log(adminDetails);
    
    const handleChange=(e)=>{
        const {name,value}=e.target;
         setAdminDetails({...adminDetails,[name]:value})
    }
    const loginFunction=async(e)=>{
        e.preventDefault();
        try {
            const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/adminLogin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify(adminDetails)
            })
            const data= await res.json();     
              console.log(data);
           
            const updatedAdminDetails={
                ...adminDetails,
                adminId:data.adminDetails._id,
                isLogin: true
            }
            setAdminDetails(updatedAdminDetails)
            toast.success("Successfully Logged in as a Admin")
            navigate('/api/adminDashboard')
            // console.log(updatedAdminDetails);
            

        } catch (error) {
            console.log("Error in login admin frontend",error);
            toast.success("Errorin loging in as a Admin")
        }
    }
  return (
  
   <div className="max-w-screen overflow-x-hidden flex justify-center items-center min-h-screen h-fit relative bg-fixed bg-no-repeat bg-center bg-cover 
   bg-[url('https://images.pexels.com/photos/845242/pexels-photo-845242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
     
    
    
     <form
  action=""
  className="bg-[rgba(1,1,1,0.41)] text-white p-8 rounded-lg shadow-[0px_0px_10px_0px_white] w-full px-10  
    mx-auto max-w-sm backdrop-blur-[7px] text-[20px] flex flex-col space-y-6 items-center text-center"
>
  <h2 className="text-3xl font-bold mb-4">Login</h2>

  <div className="w-full">
    <label htmlFor="email" className="flex items-center space-x-2 mb-2">
      <FaEnvelope className="text-red-400 text-xl" />
      <span>Enter your email:</span>
    </label>
    <input
      type="email"
      name="email"
      id="email"
      onChange={handleChange}
      className="w-full border-2 border-white bg-transparent text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
    />
  </div>

  <div className="w-full">
    <label htmlFor="password" className="flex items-center space-x-2 mb-2">
      <FaLock className="text-red-400 text-xl" />
      <span>Enter your password:</span>
    </label>
    <input
      type="password"
      name="password"
      id="password"
      onChange={handleChange}
      className="w-full border-2 border-white bg-transparent text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
    />
  </div>

  <button
    onClick={loginFunction}
    className="mt-4 flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
  >
    <FaSignInAlt />
    <span>Login</span>
  </button>
</form>
     
   </div>
  )
}

export default AdminAuth