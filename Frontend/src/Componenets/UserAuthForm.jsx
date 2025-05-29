import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkedAlt } from 'react-icons/fa';
import { UserContext } from '../Context/UserContextProvider';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function UserAuthForm() {
    const [isRegistering, setIsRegistering] = useState(true);
    const {userDetailsObj,setUserDetailsObj}=useContext(UserContext);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      mobile: '',
      address: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (isRegistering) {
        try {
          const res = await fetch("https://peace-pg-s-management-system.onrender.com/api/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
          console.log(data);
    
          // Save all user info along with login status
          setUserDetailsObj({
            ...formData,
            userId: data.userDetails?._id || "", // depends on API response
            isLogin: true,
          });
    
          toast.success("User Registered Successfully");
          navigate("/");
        } catch (error) {
          console.error("Error registering user", error);
          toast.error("Error in User Registration");
        }
      } else {
        try {
          const res = await fetch("https://peace-pg-s-management-system.onrender.com/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
          console.log(data);
    
          if (data?.userDetails) {
            setUserDetailsObj({
              name: data.userDetails.name,
              email: data.userDetails.email,
              userId: data.userDetails._id,
              isLogin: true,
            });
    
            toast.success("User Logged in Successfully");
            navigate("/");
          } else {
            toast.error("Invalid login response");
          }
        } catch (error) {
          console.error("Error logging in user", error);
          toast.error("Error in User Sign In");
        }
      }
    };
    useEffect(()=>{
      
        console.log("USER DETAILS",userDetailsObj);
    },[userDetailsObj])
  
    return (
      <div className="flex justify-center items-center min-h-screen
      bg-cover bg-fixed bg-center bg-no-repeat
      bg-[url('https://images.pexels.com/photos/220118/pexels-photo-220118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] p-4">
        <div className="w-full max-w-md bg-[#0000005f] text-white backdrop-blur-xs rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center ">
            {isRegistering ? 'Create Account' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            {isRegistering && (
              <>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full outline-none"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaPhone className=" mr-2" />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile"
                    className="w-full outline-none"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaMapMarkedAlt className="mr-2" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full outline-none"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className=" mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className=" mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
  
          <p className="text-center text-sm ">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-purple-600 font-semibold ml-2 hover:underline"
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    );
}

export default UserAuthForm




































//const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isRegistering) {
  //    try {
  //     const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/user/register",{
  //         method:"POST",
  //         headers:{
  //             "Content-Type":"application/json"
  //         },
  //         credentials:"include",
  //         body:JSON.stringify(formData)
          
  //     })
  //     const data=await res.json();
  //     console.log(data);
  //     setUserDetailsObj(formData);
  //     console.log("USER DETAILS before storing to session storage",userDetailsObj);
  //     setUserDetailsObj({...userDetailsObj,isLogin:true})
     
  //     console.log("USER DETAILS before storing to session storage",userDetailsObj);
  //     toast.success("User Registered Successfully")
  //     navigate("/")
      
  //    } catch (error) {
  //     console.log("Error Registering User in frontend",error);
  //     toast.error("Error in User Registion")
  //    }
  //   } else {
  //     try {
  //         const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/user/login",{
  //             method:"POST",
  //             headers:{
  //                 "Content-Type":"application/json"
  //             },
  //             credentials:"include",
  //             body:JSON.stringify(formData)
  //         })
  //         const data=await res.json();
  //         console.log(data);
  //         const updatedData={
  //           ...userDetailsObj,
  //           userId:data.userDetails._id,
  //           isLogin:true
  //         }
  //         setUserDetailsObj(updatedData);
  //         sessionStorage.setItem("user-details",JSON.stringify(updatedData))
  //         toast.success("User Logged in Successfully")
  //         navigate("/")
  //        } catch (error) {
  //         console.log("Error login  User in frontend",error);
  //         toast.error("Error in User user sign in")
  //        }
  //   }
  // };