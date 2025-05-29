import React, { useContext, useEffect } from "react";
import { MdPerson, MdEmail, MdRoom, MdCategory } from "react-icons/md";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { UserContext } from "../../Context/UserContextProvider";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
function TenantsRaisedComplains({
  getAllRaisedComplaintsFunction,
  tenatsRaisedComplaintsArray,
  setTenatsRaisedComplaintsArray,
}) {
  const { userDetailsObj } = useContext(UserContext);

  useEffect(() => {
    AOS.init();
    getAllRaisedComplaintsFunction(userDetailsObj.email);
  }, []);

  const deleteComplaintFunction = async (id) => {
    try {
      const res = await fetch(
        `https://peace-pg-s-management-system.onrender.com/api/tenamts/deleteRaisedComplaint/${id}`,
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
      const updatedArray = tenatsRaisedComplaintsArray.filter((item) => {
        return item._id !== id;
      });
      setTenatsRaisedComplaintsArray(updatedArray);
      toast.success("Deleted Raised Complained Successfully");
    } catch (error) {
      console.log("error in deleting raised complaint frontend", error);
      toast.error("Oop'sError deleting Complaint");
    }
  };
  let delay = 100;
  return (
    <main className=" mx-auto space-y-6">
      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-center  text-[35px] font-bold
          text-[#f09b9b] w-full bg-[#2a122e20]  backdrop-blur-2xl py-10"
      >
        📋 All Complaints Raised Details....
      </h1>
      <section className="grid grid-cols-2 gap-5 justify-items-center p-5 px-10 ">
        {tenatsRaisedComplaintsArray.length === 0 ? (
          <p
            className="text-center text-[#f09b9b]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            No complaints submitted yet.
          </p>
        ) : (
          tenatsRaisedComplaintsArray.map((complaint, idx) => {
            delay += 150;
            return (
              <div
                data-aos="fade-left"
                data-aos-delay={delay}
                key={idx}
                className="border rounded-2xl shadow p-5 text-[#f09b9b] 
                bg-[#2a122e20]  backdrop-blur-md w-[90%] mx-auto space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MdPerson className="text-red-500" />
                    {complaint.name}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${
                      complaint.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {complaint.status || "Pending"}
                  </span>
                </div>

                <p className=" flex items-center gap-2 ">
                  <MdEmail className="text-red-500" />
                  {complaint.email}
                </p>

                {complaint.roomNumber && (
                  <p className=" flex items-center gap-2">
                    <MdRoom className="text-red-500" />
                    <span className="text-red-500"> Room:</span>{" "}
                    {complaint.roomNumber}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <p className="flex items-center gap-2 ">
                    <MdCategory className="text-red-500" />
                    <span className="text-red-500">Category: </span>{" "}
                    {complaint.category}
                  </p>
                  <p className="flex items-center gap-2 ">
                    <AiOutlineExclamationCircle className="text-red-500" />
                    <span className="text-red-500">Urgency:</span>{" "}
                    {complaint.urgency}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="flex items-center gap-2 font-medium text-red-500">
                    <FaRegCommentDots className="text-red-500" /> Description:
                  </p>
                  <p className="bg-[#271717a9] rounded p-2">
                    {complaint.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    deleteComplaintFunction(complaint._id);
                  }}
                  className="bg-[#e82727e2] hover:scale-[105%] transition ease-in px-5 py-2 text-[25px] font-bold
      hover:bg-[#ff0000] flex justify-center items-center w-fit mx-auto text-white rounded-sm "
                >
                  <MdOutlineDeleteForever />
                  Delete
                </button>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}

export default TenantsRaisedComplains;
