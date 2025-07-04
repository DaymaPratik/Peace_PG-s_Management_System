import React, { useContext, useEffect } from "react";
import { BuildingDetailsContext } from "../../Context/BuildingContextProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoHome } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
function AllBuildingDetails() {
  const {
    buildingDetailsArray,
    setBuildingDetailsArray,
    getBuildingDetailsFunction,
  } = useContext(BuildingDetailsContext);
  useEffect(() => {
    AOS.init();
    getBuildingDetailsFunction();
    console.log(buildingDetailsArray);
  }, []);

  const buildingDetailsDeteleFunction = async (id) => {
    try {
      const updatedArray = buildingDetailsArray.filter((item) => {
        return id !== item._id;
      });
      setBuildingDetailsArray(updatedArray);
      const res = await fetch(
        `https://peace-pg-s-management-system.onrender.com/api/deleteBuildingDetails/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      toast.success("Deleted  Building Details");
    } catch (error) {
      console.log("Error while deleting buildig details frontend", error);
      toast.error("Error Deleting Building Details");
    }
  };
  let delay=0;

  
  return (
    <section className='py-10 caveat-fancyFont bg-no-repeat'>
      <h2 className="text-3xl lora tracking-[5px] sm:text-4xl py-10 font-bold text-[#f09b9b] bg-[#00b5f234] text-center mb-6">
        All Building Details
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 w-full">
        {buildingDetailsArray.map((item, index) =>{
        delay=delay+150;
        return (
          <li  data-aos="fade-left" data-aos-delay={delay}
            key={index}
            className="bg-gradient-to-l  max-[400px]:text-center text-[#f09b9b] backdrop-blur-xs
      from-[#360c6583] to-[#16021e0c] text-[20px]  min-[550px]:text-[25px] md:text-[20px] lg:text-[25px] 
    rounded-3xl  p-3  transition ease-in hover:scale-[105%]  shadow-[0px_0px_7px_#f09b9b]
    flex flex-col gap-2 sm:gap-6 w-full max-w-2xl"
          >
            {/* Name */}
            <h3 className="text-3xl font-bold text-amber-600 tracking-wide">
              {item.name}
            </h3>

            {/* Address and Details */}
            <div className="space-y-3   leading-relaxed">
              <p>
                <span className="font-semibold ">📍 Address:</span>{" "}
                {item.address}
              </p>
            </div>

            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 w-full">
              <p className="my-2">
                <span className="font-semibold  ">
                  🏢 Number of Floors:
                </span>{" "}
                {item.floors}
              </p>
              <p className="my-2">
                <span className="font-semibold  ">
                  🛏️ Beds Per Floor:
                </span>{" "}
                {item.bedsPerFloor}
              </p>
              <p className="my-2">
                <span className="font-semibold  ">
                  🧮 Total Beds:
                </span>{" "}
                {item.totalBeds}
              </p>
              <p className="my-2">
                <span className="font-semibold  t0">
                  🧮 Available Beds:
                </span>{" "}
                {item.availableBeds}
              </p>

              <p className="my-2 flex max-[400px]:mx-auto  gap-2 iems-center">
                <IoHome className="text-[25px]" />
                <span className="font-semibold  ">
                  Total Flats:
                </span>{" "}
                {item.totalFlats}
              </p>
            </div>
            {/* Flat Types */}
            <div>
              <p className="font-semibold   mb-2">
                🏠 Types of Flats Available:
              </p>
              <div className="flex flex-wrap max-[400px]:justify-center gap-3">
                {item.flatTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-100 text-[12px] sm:text-base font-medium px-2 sm:px-4 py-2 rounded-full shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <p className="font-semibold   mb-2">
                ✨ Amenities Available:
              </p>
              <div className="flex flex-wrap max-[400px]:justify-center gap-3">
                {item.ammunities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-[12px] sm:text-base font-medium px-2 sm:px-4 py-2 rounded-full shadow-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {/* Delete Button */}
              <div
                onClick={() => buildingDetailsDeteleFunction(item._id)}
                className="flex items-center mt-5 space-x-2 cursor-pointer bg-red-500 w-fit px-4 py-3 rounded-lg shadow-md
                 hover:bg-red-600 transition duration-200"
              >
                <RiDeleteBin6Line className="text-white text-xl max-[400px]:text-2xl" />
                <span className="text-white font-semibold">Delete</span>
              </div>

              {/* Get Details Button */}
              
            </div>
          </li>
 )})}
      </ul>
    </section>
  );
}

export default AllBuildingDetails;
