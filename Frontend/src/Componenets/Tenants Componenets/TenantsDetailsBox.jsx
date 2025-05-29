import React, {  useEffect} from "react";

import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaVenusMars,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBed,
  FaBuilding,
  FaHome,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaCity,
  FaMapMarkedAlt,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";




function TenantsDetailsBox({tenatDetailsObj}) {
 ;
 useEffect(() => {
    AOS.init();
  }, []);
  let delay = 0;

  const DetailItem = ({ icon: Icon, label, value }) => {
    delay = delay + 50;
    return (
      <div
        data-aos-delay={delay}
        data-aos="fade-left"
        className="flex items-center gap-3 bg-[#2a122e6a] text-white backdrop-blur-2xl 
        text-[20px] p-3 px-5 rounded-lg shadow-[0px_0px_3px_white]"
      >
        <Icon className="text-[#ff2f00] text-xl shrink-0" />
        <div>
          <div className="text-md text-[#f09b9b]">{label}</div>
          <div className="text-xl font-medium ">{value}</div>
        </div>
      </div>
    );
  };

  return (
         tenatDetailsObj
      ?
      (
        <div
    data-aos="zoom-in"
      className="w-[80%] mx-auto p-6 bg-[#2a122e20] text-white 
   backdrop-blur-sm rounded-3xl shadow-[0px_0px_3px_#f09b9b]  mt-10"
    >
      <h2 className="text-3xl font-bold  mb-6 text-center text-[#f09b9b]">🏠 Your Peasonal Details</h2>

      <div className="flex flex-wrap gap-6">
        <DetailItem icon={FaUser} label="Name" value={tenatDetailsObj.name} />
        <DetailItem
          icon={FaPhoneAlt}
          label="Mobile"
          value={tenatDetailsObj.mobile}
        />
        <DetailItem
          icon={FaEnvelope}
          label="Email"
          value={tenatDetailsObj.email}
        />
        <DetailItem
          icon={FaVenusMars}
          label="Gender"
          value={tenatDetailsObj.gender}
        />
        <DetailItem
          icon={FaCalendarAlt}
          label="Admission Date"
          value={tenatDetailsObj.admissionDate}
        />
        <DetailItem
          icon={FaMoneyBillWave}
          label="Fees Allotted"
          value={`₹${tenatDetailsObj.feesAllotted}`}
        />
        <DetailItem icon={FaBed} label="Bed No" value={tenatDetailsObj.bedNo} />
        <DetailItem
          icon={FaHome}
          label="Flat Number"
          value={tenatDetailsObj.flatNumber}
        />
        <DetailItem
          icon={FaLayerGroup}
          label="Flat Type"
          value={tenatDetailsObj.flatType}
        />
        <DetailItem
          icon={FaBuilding}
          label="Floor"
          value={tenatDetailsObj.floor}
        />
        <DetailItem
          icon={FaBuilding}
          label="Building Name"
          value={tenatDetailsObj.buildingName}
        />
        <DetailItem
          icon={FaMapMarkerAlt}
          label="Address"
          value={tenatDetailsObj.address}
        />
        <DetailItem icon={FaCity} label="City" value={tenatDetailsObj.city} />
        <DetailItem
          icon={FaMapMarkedAlt}
          label="State"
          value={tenatDetailsObj.state}
        />
      </div>
    </div>
      )
      :
      (
        <div className="text-3xl font-bold py-10 mb-6 text-center bg-[#2a122e20] 
   backdrop-blur-sm text-[#f09b9b]">Your Have Not Booked A Bed Till Now </div>
      )
    
  );
}

export default TenantsDetailsBox;
