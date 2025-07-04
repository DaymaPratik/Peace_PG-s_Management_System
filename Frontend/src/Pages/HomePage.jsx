import React, { useEffect } from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useState } from "react";
function HomePage() {
  const [testimonials,setTestimonials]=useState([]);
  const getTestimonialsDFunction=async()=>{
    try {
      const res=await fetch('https://peace-pg-s-management-system.onrender.com/api/get/testimonialsDetails',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data=await res.json();
      console.log(data);
      setTestimonials(data.testimonialsDetailsArray)
      
    } catch (error) {
      console.log("Error in frontend for getting testimonials",error);
      
    }
  }
  useEffect(() => {
    AOS.init();
    getTestimonialsDFunction();
  }, []);

  let delay=0;
  const amentitiesArray=[
    "🛏️ Fully Furnished Rooms (Single/Double Sharing)",
    "🍱 Nutritious Home-Cooked Meals (3 times a day)",
   "🚿 24x7 Water Supply & Clean Bathrooms",
   "📶 High-Speed Wi-Fi",
   "🧺 Laundry & Housekeeping Services",
   "🛡️ CCTV Surveillance & Security Guard",
   "🛡️ CCTV Surveillance & Security Guard",
   "🚪 Biometric/Smart Entry System",
   "🚌 Nearby to Colleges, IT Parks & Public Transport",
   "📺 Common Recreation Room with TV, Games & Books"
    ]

    const whyUsArray=[
     {
      heading: "✅ Student & Corporate Friendly",
      subHeading:"Tailored to fit your academic or professional lifestyle."
     },
     {
      heading: "🕐 Flexible Rent Plans",
      subHeading:"Affordable and transparent pricing with flexible stay options"
     },
     {
      heading:  "🧹 Hygiene First",
      subHeading:"Regular sanitation and dedicated cleaning staff"
     },
     {
      heading:  "🧘 Community Living",
      subHeading:"Close to top colleges, IT hubs, and metro/bus station."
     },
     {
      heading: "✅ Student & Corporate Friendly",
      subHeading:" Events, networking, and a warm, friendly atmosphere"
     }
 ]



 const featuresDataArray = [
    { feature: 'Meals Included', ourPg: true, flat: false, otherPg: false },
    { feature: 'Cleaning Services', ourPg: true, flat: false, otherPg: 'sometimes' },
    { feature: 'High-Speed Wi-Fi', ourPg: true, flat: true, otherPg: false },
    { feature: 'Security & CCTV', ourPg: true, flat: false, otherPg: true },
    { feature: 'Furnished Rooms', ourPg: true, flat: false, otherPg: 'partial' },
    { feature: 'Community Events', ourPg: true, flat: false, otherPg: false },
  ];


    const renderIcon = (value) => {
    if (value === true) return <FaCheckCircle className="text-green-500 mx-auto" />;
    if (value === false) return <FaTimesCircle className="text-red-500 mx-auto" />;
    return <span className=" capitalize text-center block">{value}</span>;
  };



  
//   const testimonials = [
//   {
//     name: 'Priya Sharma',
//     role: 'B.Tech Student, Delhi University',
//     feedback:
//       'Staying here felt just like home! The food is great, the rooms are clean, and I made lifelong friends.',
//     rating: 5,
//     image: 'https://randomuser.me/api/portraits/women/68.jpg',
//   },
//   {
//     name: 'Ravi Verma',
//     role: 'Software Engineer, TCS',
//     feedback:
//       'Safe and peaceful place after long office hours. I love the high-speed Wi-Fi and the chill common area!',
//     rating: 4,
//     image: 'https://randomuser.me/api/portraits/men/75.jpg',
//   },
//   {
//     name: 'Megha Kulkarni',
//     role: 'MBA Student, Symbiosis Pune',
//     feedback:
//       'The staff is super friendly, and the events here made my weekends so much fun. Highly recommended!',
//     rating: 5,
//     image: 'https://randomuser.me/api/portraits/women/65.jpg',
//   },
//   {
//     name: 'Megha Kulkarni',
//     role: 'MBA Student, Symbiosis Pune',
//     feedback:
//       'The staff is super friendly, and the events here made my weekends so much fun. Highly recommended!',
//     rating: 5,
//     image: 'https://randomuser.me/api/portraits/women/65.jpg',
//   },
//   {
//     name: 'Megha Kulkarni',
//     role: 'MBA Student, Symbiosis Pune',
//     feedback:
//       'The staff is super friendly, and the events here made my weekends so much fun. Highly recommended!',
//     rating: 5,
//     image: 'https://randomuser.me/api/portraits/women/65.jpg',
//   },
// ];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 text-yellow-400 justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? '' : 'text-gray-300'} />
      ))}
    </div>
  );
};
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <div
        className='caveat-fancyFont relative  text-[60px] sm:text-[90px] lg:text-[120px] font-[10px] text-white bg-fixed bg-center bg-no-repeat bg-cover 
    bg-[url("https://images.unsplash.com/photo-1635877571599-a36639e3ea31?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
     min-h-[70vh] sm:min-h-screen h-fit flex-col flex justify-center items-center text-center'
      >
        {/* <div className='absolute w-full h-screen bg-[#000000] '> */}

        {/* </div> */}

        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="lora tracking-[15px]"
        >
          PEACE-PG's
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-[20px] sm:text-[40px] lg:text-[60px] font-bold"
        >
          This Place fells like Hevan
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-[30px] sm:text-[50px] lg:text-[70px] font-bold"
        >
          WE CARE FOR YOUR LIVING
        </p>

        <div className="w-fit mx-auto">
          <button className="bg-[#00000092] px-3 py-2 text-[25px] shadow-[0px_0px_10px_black] hover:bg-indigo-800 rounded hover:scale-[105%] transition ease-in">
            Get in Touch &#8594;
          </button>
        </div>
      </div>





       {/* ABOUT US */}
      <section className=" overflow-x-hidden
      max-sm:flex-col max-sm:items-center flex justify-center  min-h-[80vh] h-fit gap-10 bg-center bg-cover bg-fixed text-white
      bg-[url('https://images.unsplash.com/photo-1635877571599-a36639e3ea31?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        
        
        
        <div 
        data-aos="fade-right"
        data-aos-delay="0"
        className="w-[90%] sm:w-[60%] md:w-[55%] relative">
        <div className="w-[300px] sm:w-[400px] h-[250px] sm:h-[350px] lg:w-[500px] lg:h-[450px] bg-[#33083fe3]">
           <div className="absolute left-10 md:left-20  h-fit top-[10px] md:top-[20px] z-10">
           <h2 className="lora text-[30px] sm:text-[50px] lg:text-[70px]">About Us</h2>
          <p className="caveat-fancyFont text-[17px] sm:text-[20px] lg:text-[25px]">
            At PEACE-PG's, we understand the challenges of relocating to a new
            city — whether you're chasing your academic goals or building your
            career. Founded with a mission to offer more than just a bed to
            sleep in, we strive to create a community-focused, secure, and
            comfortable living environment where you can truly feel at home.
            With a focus on cleanliness, convenience, and community, we’ve
            become the preferred choice for hundreds of students and working
            professionals looking for hassle-free PG accommodation.
          </p>
        
         </div>
        </div>
        </div>


        <div className="w-[70%] sm:w-[35%]"
            data-aos="fade-left"
            data-aos-delay="0"
        >
            <img
            
            src="https://images.unsplash.com/photo-1512403754473-27835f7b9984?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Building Image" className="w-[90%] h-[300px] md:h-[400px] lg:h-[500px] " />
        </div>
      </section>



       {/* WHAT WE OFFER */}
      <section className='caveat-fancyFont relative text-white bg-fixed bg-center bg-no-repeat bg-cover 
    bg-[url("https://images.unsplash.com/photo-1635877571599-a36639e3ea31?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
     min-h-[70vh] h-fit flex-col flex justify-center items-center text-center'>
          <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="lora font-bold tracking-[5px] lg:tracking-[10px] text-[35px] sm:text-[40px] lg:text-[50px]"
        >
         All-Inclusive Living Experience
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-[30px] sm:text-[35px] lg:text-[45px]"
        >
          Everything you need, under one roof.
        </p>
        <ul className="w-[90%] gap-5 justify-center items-center flex flex-wrap mx-auto p-5 lg:p-10">
         {amentitiesArray.map((item,idx)=>{
          delay=delay+50;
          return (
          
            <li 
              data-aos="fade-left" data-aos-delay={delay}
               key={idx} className="bg-[#4a1e558f] hover:bg-[#00000081] ease-in transition backdrop-blur-sm text-[15px] sm:text-[20px] lg:text-[30px] font-black px-3 py-1
                hover:scale-[105%] hover:shadow-[0px_0px_25px_#ce1afc8f] shadow-[0px_0px_10px_black] rounded-sm ">
              {item}
            </li>
          )
         })}
        </ul>


       
      </section>



       {/* Why Choose Us */}
      <section className='caveat-fancyFont relative text-white bg-fixed bg-center bg-no-repeat bg-cover 
    bg-[url("https://images.unsplash.com/photo-1635877571599-a36639e3ea31?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
     min-h-[70vh] h-fit flex-col flex justify-center items-center text-center'>
          <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="lora lighter tracking-[5px] lg:tracking-[10px] text-[35px] sm:text-[40px] lg:text-[50px]"
        >
           Why Choose PEACE PG's
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-[30px] sm:text-[35px] lg:text-[45px]"
        >
         More than a stay — it’s a lifestyle upgrade.
        </p>
        <ul className="w-[90%] gap-5 justify-center items-center flex flex-wrap mx-auto p-5 lg:p-10">
         {whyUsArray.map((item,idx)=>{
          delay=delay+50;
          return (
          
            <li 
              data-aos="fade-left" data-aos-delay={delay}
               key={idx} className="bg-[#4a1e558f]  text-center backdrop-blur-sm text-[20px] sm:text-[25px] lg:text-[30px] ease-in transition 
               hover:bg-[#00000081] font-black px-3 hover:scale-[105%] hover:shadow-[0px_0px_25px_#ce1afc8f]
                py-1 shadow-[0px_0px_10px_black] rounded-sm ">
              <h2 className="lora tracking-[5px] lighter">{item.heading}</h2>
              <p className="bold text-[15px] sm:text-[20px] lg:text-[25px]">{item.subHeading}</p>
            </li>
          )
         })}
        </ul>


       
      </section>

       {/* Comparison Table */}
      <section className='caveat-fancyFont relative text-white bg-fixed bg-center bg-no-repeat bg-cover 
    bg-[url("https://images.unsplash.com/photo-1635877571599-a36639e3ea31?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
     min-h-screen h-fit flex-col flex justify-center items-center text-center'>
         <h2 
          data-aos="fade-up"
          data-aos-delay="100"
          className="lora medium tracking-[5px] lg:tracking-[10px] text-[35px] sm:text-[40px] lg:text-[50px]"
         >Why PG Living is Better With Us
        </h2>

         <p data-aos="fade-up"
          data-aos-delay="100"
          className="bold text-[30px] sm:text-[35px] lg:text-[45px]">LETS COMPARE</p>
      <table
      data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="200"
      className="min-w-[70%] mx-auto mt-10 bg-[#4a1e558f] backdrop-blur-xs text-center text-[15px] min-[550px]:text-[20px] sm:text-[25px] lg:text-[30px] ">
        <thead>
          <tr className="lora tracking-[2px] md:tracking-[5px]">
            <th className="p-1 md:p-3 border">Feature</th>
            <th className="p-1 md:p-3 border">Our PG</th>
            <th className="p-1 md:p-3 border">Typical Flat</th>
            <th className="p-1 md:p-3 border">Other PGs</th>
          </tr>
        </thead>
        <tbody>
          {featuresDataArray.map((item, idx) => (
            <tr key={idx} className="hover:scale-[105%] hover:bg-[#00000081] hover:shadow-[0px_0px_10px_#ce1afc8f] transition ease-in">
              <td className="p-1 md:p-3 border font-medium ">{item.feature}</td>
              <td className="p-1 md:p-3 border">{renderIcon(item.ourPg)}</td>
              <td className="p-1 md:p-3 border">{renderIcon(item.flat)}</td>
              <td className="p-1 md:p-3 border">{renderIcon(item.otherPg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>





      {/* Testimonials */}

       <section className='caveat-fancyFont relative text-white bg-fixed bg-center bg-no-repeat bg-cover 
    bg-[url("https://images.unsplash.com/photo-1635877571599-a36639e3ea31?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
     min-h-screen h-fit pb-10 text-center'>
      <div className="w-full mx-auto px-5 lg:px-10">
        <h2
        data-aos="fade-up"
        className="tracking-[5px] lg:tracking-[10px] text-[35px] sm:text-[40px] lg:text-[50px] medium text-center lora  mb-10">
          What Our Residents Say
        </h2>
       
        <div className="flex flex-wrap justify-center items-center gap-5 lg:gap-8 ">
          
          {testimonials.map((testimonial, index) =>{
            delay = delay+100;
            return  (
            <div
            data-aos="fade-left" 
            data-aos-delay={delay}
              key={index}
              className="shadow-lg w-[90%] min-[450px]:w-[45%] md:w-[30%] h-[100%] text-[17px] lg:text-[20px] bg-[#4a1e558f] hover:shadow-[0px_0px_25px_#ce1afc8f] hover:bg-[#00000081]
               backdrop-blur-xs rounded-2xl p-2 md:p-6 text-center ease-in transition-transform hover: hover:scale-[1.05]"
            >
              <h3 className="text-[25px] lg:text-[30px] bold ">{testimonial.name}</h3>
              <p className=" mb-1">{testimonial.designation}</p>
              <StarRating rating={testimonial.rating} />
              <p className=" mt-2">{testimonial.description}</p>
            </div>
          )
          })}
        </div>
      </div>
    </section>
    </main>
  );
}

export default HomePage;
