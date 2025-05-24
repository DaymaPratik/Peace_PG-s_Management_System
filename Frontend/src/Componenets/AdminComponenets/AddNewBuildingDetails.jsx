import React, { useContext, useState } from 'react';
import { BuildingDetailsContext } from '../../Context/BuildingContextProvider';

function AddNewBuildingDetails({setRenderComponenet}) {
  const {getBuildingDetailsFunction}=useContext(BuildingDetailsContext);
  
  const [buildingDetails, setBuildingDetails] = useState({
    name: '',
    floors: '',
    flatsPerFloor: '',
    address: '',
    bedsPerFloor:"",
    flatTypes: [],
    ammunities:[],
  });
  


  const flatOptions = ['1RK', '1BHK', '2BHK', '3BHK'];
  const typesOfAmmunitiesArray=["Wifi","Hot Water","Washing Machine","Mess","Pesonal Cook","Gym","Parking","Playing Area","Common Area"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuildingDetails({ ...buildingDetails, [name]: value });
  };

  const handleFlatTypeChange = (e) => {
    const { value, checked } = e.target;
    const updatedTypes = checked
      ? [...buildingDetails.flatTypes, value]
      : buildingDetails.flatTypes.filter((type) => type !== value);
    setBuildingDetails({ ...buildingDetails, flatTypes: updatedTypes });
  };


const handleAmunnitiesAvailFunction = (e) => {
  const { value, checked } = e.target;
  const updatedTypes = checked
    ? [...buildingDetails.ammunities, value]
    : buildingDetails.ammunities.filter((type) => type !== value);
  setBuildingDetails({ ...buildingDetails, ammunities: updatedTypes });
};

  const addNewBuildingFunction =async (e) => {
    e.preventDefault();
    console.log('Submitted Building Details:', buildingDetails);
    try {
      const response=await fetch("https://peace-pg-s-management-system.onrender.com/api/addBuildingDetails",{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(buildingDetails)
      });
      const data=await response.json();
      console.log(data);
      setRenderComponenet("AllBuildingDetails");
      getBuildingDetailsFunction();
      
      setBuildingDetails({
        name: '',
        floors: '',
        flatsPerFloor: '',
        address: '',
        bedsPerFloor:"",
        flatTypes: [],
        ammunities:[],
      });

    } catch (error) {
      console.log("Error in fontend add new building",error);
    }
  };
  

  return (
    <div className='w-full py-10'>
      <section className="max-w-[90%] mx-auto bg-gradient-to-l from-[#ed82c694] to-[#a2cbf977]  shadow-xl rounded-lg p-8 mt-10">
      <h2 className="text-4xl mx-auto font-extrabold text-center mb-6 w-fit px-5 border-b-4 text-green-500 border-green-500">Add Building Details</h2>
      <form onSubmit={addNewBuildingFunction} className="space-y-10 text-lg">
        <div>
          <label htmlFor="name" className="block mb-1 text-2xl font-medium">Building Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={buildingDetails.name}
            onChange={handleChange}
            className="w-full focus:border-none border-1 border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className='flex  gap-5  flex-wrap px-2 py-2 '>
          <label htmlFor="floors" className=" text-2xl w-[30%] font-medium">Number of Floors
          <input
            type="number"
            id="floors"
            name="floors"
            value={buildingDetails.floors}
            onChange={handleChange}
            className="w-[50%] block mt-3 focus:border-none border-1 border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          </label>
          <label htmlFor="flatsPerFloor" className=" text-2xl w-[30%] font-medium">Flats per Floor
          <input
            type="number"
            id="flatsPerFloor"
            name="flatsPerFloor"
            value={buildingDetails.flatsPerFloor}
            onChange={handleChange}
            className="w-[50%] block mt-3 focus:border-none border-1 border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          </label>
          <label htmlFor="bedsPerFloor" className="text-2xl w-[30%] font-medium">Beds per Floor
          <input
            type="number"
            id="bedsPerFloor"
            name="bedsPerFloor"
            value={buildingDetails.bedsPerFloor}
            onChange={handleChange}
            className="w-[50%] block mt-3 focus:border-none border-1 border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          </label>
        </div>

        
       

        <div>
          <label htmlFor="address" className="block text-2xl mb-1 font-medium">Building Address</label>
          <textarea
            id="address"
            name="address"
            value={buildingDetails.address}
            onChange={handleChange}
            className="w-full focus:border-none border-1 border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            required
          />
        </div>


        <div>
          <label className="block text-2xl mb-2 font-medium">Types of Flats Available</label>
          <div className="flex flex-wrap text-2xl gap-6">
            {flatOptions.map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  value={type}
                //   checked={buildingDetails.flatTypes.includes(type)}
                  onChange={handleFlatTypeChange}
                  className="accent-amber-600 size-[20px] "
                />
                {type}
              </label>
            ))}
          </div>
          </div>
          <div>
          <label className="block text-2xl mb-2 font-medium ">Types of Ammunities Available</label>
          <div className="flex flex-wrap text-2xl gap-8">
            {typesOfAmmunitiesArray.map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  value={type}
                //   checked={buildingDetails.ammunities.includes(type)}
                  onChange={handleAmunnitiesAvailFunction}
                  className="accent-amber-600 size-[20px] "
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit Building Details
        </button>
      </form>
      </section>
    </div>
  );
}

export default AddNewBuildingDetails;