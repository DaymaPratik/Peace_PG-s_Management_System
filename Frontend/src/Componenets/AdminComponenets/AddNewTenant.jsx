import React, { useContext, useEffect, useState } from "react";
import { BuildingDetailsContext } from "../../Context/BuildingContextProvider";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const AddNewTenant = ({ setRenderComponenet }) => {
  const { buildingDetailsArray } = useContext(BuildingDetailsContext);
  const [buildingNamesArray, setBuildngNamesArray] = useState([]);
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    const updatedArray = buildingDetailsArray.map((item) => {
      return item.name;
    });
    setBuildngNamesArray(updatedArray);
    // console.log(updatedArray);
  }, [buildingDetailsArray]);
  useEffect(() => {
    console.log(buildingNamesArray);
  }, [buildingNamesArray]);

  const [tenantData, setTenantData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    gender: "",
    flatType: "",
    floor: "",
    bedNo: "",
    buildingName: "",
    feesAllotted: "",
    flatNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Tenant Data:", tenantData);
    try {
      const res = await fetch("https://peace-pg-s-management-system.onrender.com/api/addNewTenantDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tenantData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        toast.error(data.message);
      }
      if (data.success) {
        setRenderComponenet("AllTenantsDetails");
        toast.success(data.message);
        setTenantData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          city: "",
          state: "",
          gender: "",
          flatType: "",
          floor: "",
          bedNo: "",
          buildingName: "",
          flatNumber: "",
          feesAllotted: "",
          admissionDate: "",
        });
      }
    } catch (error) {
      console.log("Error in frontend  while adding a student:", error);
      toast.error("Error in backend whle adding new tenant");
    }
  };

  return (
    <section className="w-[100%] text-[15px] sm:text-[20px] lg:text-[25px] caveat-fancyFont py-10  bold">
      <div
      data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="100"
      className="w-[95%] sm:w-[80%] mx-auto backdrop-blur-sm bg-[#11052f43] text-[#fbaeae]  rounded-xl shadow-[0px_0px_10px_#f09b9b]  p-2 sm:p-5 mt-10">
        <h2 className="text-4xl lora border-b-4 py-2 border-green-400 w-fit mx-auto px-5 font-extrabold text-green-400 mb-6 text-center ">
          Add New Tenant
        </h2>
        <form
          className="rounded-xl text-[#f09b9b] w-[98%] min-[400px]:w-[95%] sm:w-[90%]  mx-auto"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}

          <section className="grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6  w-full">
            <div className="flex flex-col">
              <label htmlFor="name" className="   mb-1">
                Full Name
              </label>
              <input
                id="name"
                className="px-2 py-1 rounded-sm focus:bg-white border-1 focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.name}
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="   mb-1">
                Email
              </label>
              <input
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                id="email"
                value={tenantData.email}
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="   mb-1">
                Mobile Number
              </label>
              <input
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                id="mobile"
                value={tenantData.mobile}
                type="tel"
                name="mobile"
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className=" font-semibold  mb-1"
              >
                Address
              </label>
              <input
                id="address"
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.address}
                type="text"
                name="address"
                onChange={handleChange}
                required
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className=" mb-1">
                City
              </label>
              <input
                id="city"
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.city}
                type="text"
                name="city"
                onChange={handleChange}
                required
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label htmlFor="state" className="  mb-1">
                State
              </label>
              <input
                id="state"
                className="px-2 py-1 rounded-sm e border-1 0 focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.state}
                type="text"
                name="state"
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label htmlFor="gender" className="   mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={tenantData.gender}
                onChange={handleChange}
                className="px-2 bg-[#221b34] py-1 rounded-sm border-1  focus:outline-2 focus:border-none outline-red-400"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Flat Type */}
            <div className="flex flex-col">
              <label
                htmlFor="flatType"
                className="   mb-1"
              >
                Flat Type
              </label>
              <select
                id="flatType"
                name="flatType"
                value={tenantData.flatType}
                onChange={handleChange}
                className="px-2 bg-[#221b34]  py-1 rounded-sm border-1  focus:outline-2 focus:border-none outline-red-400"
                required
              >
                <option value="">Select Flat Type</option>
                <option value="1RK">1RK</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
              </select>
            </div>

            {/* Building Name */}
            <div className="flex flex-col">
              <label
                htmlFor="buildingName"
                className="    mb-1"
              >
                Building Name
              </label>
              <select
                id="buildingName"
                name="buildingName"
                value={tenantData.buildingName}
                onChange={handleChange}
                className="px-2 py-1 bg-[#221b34] rounded-sm ] border-1 0 focus:outline-2 focus:border-none outline-red-400"
                required
              >
                <option value="">Select Building Name</option>
                {buildingNamesArray.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center gap-5 md:gap-10 py-8 w-full ">
            {/* Floor */}
            <div className="flex flex-col">
              <label htmlFor="floor" className=" mb-1">
                Floor Number
              </label>
              <input
                id="floor"
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.floor}
                type="number"
                name="floor"
                onChange={handleChange}
                required
              />
            </div>

            {/* Bed Number */}
            <div className="flex flex-col">
              <label htmlFor="bedNo" className="  0 mb-1">
                Bed Number
              </label>
              <input
                id="bedNo"
                className="px-2 py-1 rounded-sm focus:bg-white border-1 focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.bedNo}
                type="text"
                name="bedNo"
                onChange={handleChange}
                required
              />
            </div>

            {/* Flat Number */}
            <div className="flex flex-col">
              <label
                htmlFor="flatNumber"
                className="   mb-1"
              >
                Flat Number
              </label>
              <input
                id="flatNumber"
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.flatNumber}
                type="text"
                name="flatNumber"
                onChange={handleChange}
                required
              />
            </div>

            {/*Admission Date*/}
            <div className="flex flex-col">
              <label
                htmlFor="admissionDate"
                className="  mb-1"
              >
                Admission Date
              </label>
              <input
                id="admissionDate"
                className="px-2 py-1 rounded-sm focus:bg-white border-1 focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.admissionDate}
                type="date"
                name="admissionDate"
                onChange={handleChange}
                required
              />
            </div>

            {/* Fees Allotted */}
            <div className="flex flex-col">
              <label
                htmlFor="feesAllotted"
                className="   mb-1"
              >
                Fees Allotted (₹)
              </label>
              <input
                id="feesAllotted"
                className="px-2 py-1 rounded-sm focus:bg-white border-1  focus:outline-2 focus:border-none outline-red-400"
                value={tenantData.feesAllotted}
                type="number"
                name="feesAllotted"
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-10">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-3 rounded-lg shadow transition duration-300"
            >
              Add Tenant
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewTenant;
