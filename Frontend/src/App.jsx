import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AdminAuth from "./Pages/AdminAuth";
import TenantAuth from "./Pages/TenantAuth";
import ContactUs from "./Pages/ContactUs";
import AdminContextProvider from "./Context/AdminContextProvider";
import AdminDashboad from "./Pages/AdminDashboad";
import Navbar from "./Componenets/Navbar";
import AdminDetails from "./Pages/AdminDetails";
import BuildingContextProvider from "./Context/BuildingContextProvider";
import UserContextProvider from "./Context/UserContextProvider";
import { ToastContainer,Zoom } from "react-toastify";
import TenantDashboard from "./Pages/TenantDashboard";
import SideBar from "./Componenets/SideBar";
import SideBarContextProvider from "./Context/SideBarContextProvider";
import Footer from "./Componenets/Footer";
function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <BuildingContextProvider>
          <AdminContextProvider>
           <SideBarContextProvider>
             <main className="overflow-x-hidden">
              <Navbar />
             <SideBar/>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Zoom}
            />
          
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/api/adminAuth" element={<AdminAuth />} />
              <Route path="/api/userAuth" element={<TenantAuth />} />
              <Route path="/api/contactUs" element={<ContactUs />} />
              <Route path="/api/adminDetails" element={<AdminDetails />} />
              <Route path="/api/adminDashboard" element={<AdminDashboad />} />
              <Route path="/api/tenantAuth" element={<TenantAuth />} />
              <Route path="/api/tenantDashBoard" element={<TenantDashboard />} />
            </Routes>
             </main>
             <Footer/>
           </SideBarContextProvider>
          </AdminContextProvider>
        </BuildingContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
