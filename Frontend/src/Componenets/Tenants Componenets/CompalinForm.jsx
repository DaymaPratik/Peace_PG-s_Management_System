import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { TbAd2 } from "react-icons/tb";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaUser,
  FaEnvelope,
  FaDoorOpen,
  FaListAlt,
  FaExclamationTriangle,
  FaRegCommentDots,
} from "react-icons/fa";
import { UserContext } from "../../Context/UserContextProvider";
function CompalinForm({ getAllRaisedComplaintsFunction }) {
  const { userDetailsObj } = useContext(UserContext);

  useEffect(() => {
    AOS.init({
        duration:1000,
       
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: userDetailsObj.email,
    roomNumber: "",
    category: "",
    urgency: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(
        "https://peace-pg-s-management-system.onrender.com/api/tenants/complainRaised",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      toast.success("Complain Raised Successfully ..");
      getAllRaisedComplaintsFunction(userDetailsObj.email);
      setFormData({
        name: "",
        email: userDetailsObj.email,
        roomNumber: "",
        category: "",
        urgency: "",
        description: "",
      });
    } catch (error) {
      console.log("Error in sumitting contact us form ", error);
      toast.error("Error in raising a complain ");
    }
  };
  return (
    <main className="min-h-screen  w-full h-fit mt-10">
      <section
      data-aos="zoom-in"
        className="text-center text-[25px] font-bold
         text-[#f09b9b] bg-[#2a122e14]   backdrop-blur-xl py-10"
      >
        <h1 
        data-aos="fade-up" data-aos-delay="150"
        className="text-[45px] font-bold">Wanna Register A Complain ?</h1>

        <pre data-aos="fade-up" data-aos-delay="300">
          We care for your issuses ! All Raised Problem will be solved shortly
          ...
        </pre>
        <p
        data-aos="fade-up" data-aos-delay="450"
        className="flex justify-center items-center gap-2">
          <MdKeyboardDoubleArrowDown className="text-white text-[30px]" />
          <TbAd2 className="text-white text-[30px]" />
          Fill The Form Given Below
          <MdKeyboardDoubleArrowDown className="text-white text-[30px]" />
        </p>
      </section>




      <section 
      className="my-10 p-5 w-full shadow-[0px_0px_7px_#2a122e14] max-w-2xl mx-auto bg-[#2a122e14] rounded-xl text-white backdrop-blur-xs  ">
        <h2 className="text-2xl font-bold text-center mb-4" data-aos="fade-up" data-aos-delay="100">
          📝 PG Complaint Form
        </h2>
        <form
          className="
         grid grid-cols-2
         gap-y-4 p-6  mx-auto  gap-2"
        >
          <div className="flex items-center border bg-transparent p-2 rounded" data-aos="fade-left" data-aos-delay="200">
            <FaUser className="mr-2 text-[#ff0000] text-[30px]" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full outline-none px-2 py-1 focus:bg-transparent"
            />
          </div>
          <div className="flex items-center border p-2 rounded" data-aos="fade-left" data-aos-delay="300">
            <FaEnvelope className="mr-2 text-[#ff0000] text-[30px]" />
            <input
              type="email"
              name="email"
              disabled
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full outline-none  px-2 py-1 focus:bg-transparent"
            />
          </div>

          <div className="flex items-center border p-2 rounded" data-aos="fade-left" data-aos-delay="400">
            <FaDoorOpen className="mr-2 text-[#ff0000] text-[30px]" />
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number (optional)"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full outline-none  px-2 py-1 focus:bg-transparent"
            />
          </div>

          <div className="flex items-center border p-2 rounded" data-aos="fade-left" data-aos-delay="400">
            <FaListAlt className="mr-2 text-[#ff0000] text-[30px]" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full outline-none p-2 bg-[#7d3838]"
            >
              <option>Category</option>
              <option>Food</option>
              <option>Cleanliness</option>
              <option>Internet</option>
              <option>Water</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center border p-2 rounded " data-aos="fade-left" data-aos-delay="500">
            <FaExclamationTriangle className="mr-2 text-[30px] bg-[#ff0000] p-1" />
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full outline-none p-2 bg-[#7d3838]"
            >
              <option>Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </form>

        <div className="flex items-start border p-2 rounded w-[90%] mx-auto mb-5 my-3" data-aos="fade-up" data-aos-delay="100">
          <FaRegCommentDots className="mr-2 mt-1 text-[#ff0000] text-[30px]" />
          <textarea
            name="description"
            placeholder="Describe your issue"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full outline-none  px-2 py-1 focus:bg-transparent"
            rows={4}
          />
        </div>

        <button
        data-aos="fade-up" data-aos-delay="100"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 w-fit block mx-auto rounded hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </section>
    </main>
  );
}

export default CompalinForm;
