import React, { useContext, useEffect } from "react";
import { BuildingDetailsContext } from "../../Context/BuildingContextProvider";
import { RiDeleteBin6Line } from "react-icons/ri";

function AllBuildingDetails() {
  const { buildingDetailsArray , setBuildingDetailsArray,getBuildingDetailsFunction} = useContext(BuildingDetailsContext);
  useEffect(() => {
    getBuildingDetailsFunction();
    console.log(buildingDetailsArray);
  }, []);
  // useEffect(()=>{
   
  // },[buildingDetailsArray])


const buildingDetailsDeteleFunction=async(id)=>{
  try {
    const updatedArray=buildingDetailsArray.filter((item)=>{
      return id !== item._id
    })
    setBuildingDetailsArray(updatedArray)
    const res=await fetch(`http://localhost:8000/api/deleteBuildingDetails/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const data=await res.json();
    console.log(data);
    
  } catch (error) {
    console.log("Error while deleting buildig details frontend",error);
    
  }
}



  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        All Building Details
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full">
        {buildingDetailsArray.map((item, index) => (
          <li
            key={index}
            className="bg-gradient-to-br from-[#f6e3e33e] to-[#f382ea67] border text-[25px]
   border-gray-200 rounded-3xl shadow-lg p-8 transition-all hover:scale-[105%] hover:shadow-5xl
    flex flex-col gap-6 w-full max-w-2xl"
          >
            {/* Name */}
            <h3 className="text-3xl font-bold text-amber-600 tracking-wide">
              {item.name}
            </h3>

            {/* Address and Details */}
            <div className="space-y-3 text-gray-700  leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">📍 Address:</span>{" "}
                {item.address}
              </p>
            </div>

            <div className="grid grid-cols-2 w-full">
              <p className="my-2">
                <span className="font-semibold  text-gray-900">
                  🏢 Number of Floors:
                </span>{" "}
                {item.floors}
              </p>
              <p className="my-2">
                <span className="font-semibold  text-gray-900">
                  🛏️ Beds Per Floor:
                </span>{" "}
                {item.bedsPerFloor}
              </p>
              <p className="my-2">
                <span className="font-semibold  text-gray-900">
                  🧮 Total Beds:
                </span>{" "}
                {item.totalBeds}
              </p>
            </div>
            {/* Flat Types */}
            <div>
              <p className="font-semibold  text-gray-900 mb-2">
                🏠 Types of Flats Available:
              </p>
              <div className="flex flex-wrap gap-3">
                {item.flatTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-100 text-amber-800 text-base font-medium px-4 py-2 rounded-full shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <p className="font-semibold  text-gray-900 mb-2">
                ✨ Amenities Available:
              </p>
              <div className="flex flex-wrap gap-3">
                {item.ammunities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-base font-medium px-4 py-2 rounded-full shadow-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

             <div 
                  onClick={()=>{buildingDetailsDeteleFunction(item._id)}}
                    className="flex items-center space-x-3 cursor-pointer  bg-red-500 w-fit px-4 py-3 mx-auto">
                        <RiDeleteBin6Line className="text-white mr-2 text-2xl" />
                          Delete
              </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AllBuildingDetails;
