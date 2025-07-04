
import UserAuthForm from '../Componenets/UserAuthForm';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

 
function TenantAuth() {
   useEffect(()=>{
    AOS.init();
  },[])
  
  return (
    
   
      <main>
        <section className='h-[70vh] bg-fixed w-full text-white flex flex-col justify-center items-center
        bg-[url("https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
          bg-center bg-cover bg-no-repeat text-center'>
          <h1 data-aos="fade-up" data-aos-delay="100" className='text-5xl font-bold lora tracking-[5px] text-red-500'>Tenant Login / Registration</h1>
          <p data-aos="fade-up" data-aos-delay="200" className='text-[25px] font-medium caveat-fancyFont '>Manage your profile, connect to flats,
             and access personalized features — all with secure authentication.</p>
          <p data-aos-delay="300" data-aos="fade-up" className='text-[35px] font-medium caveat-fancyFont text-red-500'>Create your account to get full control...</p>
        </section>





        <UserAuthForm/>







       
      </main>

  )
}

export default TenantAuth
