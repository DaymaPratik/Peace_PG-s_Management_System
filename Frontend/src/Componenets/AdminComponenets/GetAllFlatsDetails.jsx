import React, { useEffect, useState } from "react";
import { FaBed, FaTrashAlt, FaUserFriends, FaPlus } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import AddNewFlat from "./AddNewFlat";
import { toast } from "react-toastify";
function GetAllFlatsDetails() {
    const [addNewFlat, setAddNewFlat] = useState(false);
    const [flats,setFlats]=useState([]);
  useEffect(() => {
    AOS.init();
  }, []);
  
  useEffect(()=>{
    console.log(addNewFlat)
    const getAllFlatsDetailsFunction=async()=>{
      try {
        const res=await fetch("https://peace-pg-s-management-system.onrender.com/api/flats/getAllFlatsDetails",{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        })
        const data=await res.json();
        console.log(data);
        const updatedArray=data. flatsDetailsArray;
        setFlats(updatedArray)
      } catch (error) {
        console.log("Error geting flats details frontend",error);
      }
    }
    getAllFlatsDetailsFunction();
  },[addNewFlat])
  
  const deleteFlatDetails=async(id)=>{
      try {
          const res=await fetch(`https://peace-pg-s-management-system.onrender.com/api/flats/deleteFlatDetails/${id}`,{
              method:"DELETE",
              headers:{
                  "Content-Type":"application/json",
              },
              credentials:"include"
          })
          const data=await res.json();
          const updatedFlatsArray=flats.filter((item)=>{
            return item._id!==id
          })
          setFlats(updatedFlatsArray)
          console.log(data);
          toast.success("Deleted Flat Detail Successfully")
      } catch (error) {
          console.log("Error in frontend deleting flat details",error);
          toast.error("Error deleting flat details")
      }
    }

  
 const toggleAddNewFlatValue=()=>{
    setAddNewFlat(!addNewFlat)
 }
  return (
    <>
      {addNewFlat ? (
        <AddNewFlat toggleAddNewFlatValue={toggleAddNewFlatValue} deleteFlatDetails={deleteFlatDetails}/>
      ) : (
        <main>
            <section
            className="bg-gradient-to-r text-[#f09b9b] bg-[#b922f540] backdrop-blur-sm p-8 rounded-2xl shadow-md text-center max-w-3xl mx-auto mb-10"
            data-aos="fade-down"
          >
            <h2 className="text-3xl text-[#00b7ff] font-extrabold  mb-2">
              Add A New Flat
            </h2>
            <p className=" mb-6 text-lg  text-[#ff0000]">
              Let’s Keep Growing Together 🏡
            </p>
            <button
              onClick={toggleAddNewFlatValue}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaPlus className="text-white" />
              Add New Flat
            </button>
          </section>

          <section className="grid grid-cols-2 p-10 gap-5 ">


            {flats.map((flat, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-r text-[#f09b9b] bg-[#b922f540] backdrop-blur-sm
                    rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto transition-transform transform hover:scale-105"
                  data-aos="fade-up"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#ff0000]">
                      {flat.name}
                    </h2>
                    <button
                      onClick={() => deleteFlatDetails(flat._id)}
                      className="text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 p-2 rounded-full transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  <p className=" mb-2">
                    <strong>Flat Number:</strong> {flat.flatNumber}
                  </p>
                  <p className=" mb-2">
                    <strong>Floor No:</strong> {flat.floorNo}
                  </p>
                  <p className="mb-4 flex items-center">
                    <FaBed className="mr-2 text-blue-500" /> {flat.beds} Beds
                  </p>

                  <div className="">
                    <strong className="flex items-center mb-2">
                      <FaUserFriends className="mr-2 text-green-500" /> Tenants:
                    </strong>
                    <ol className="list-decimallist-inside space-y-1">
                      {flat.tenants.map((tenant, index) => (
                        <li key={index}>{tenant}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </section>
         
        </main>
      )}
    </>
  );
}

export default GetAllFlatsDetails;
