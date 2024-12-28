//import React from 'react';
import {Route, Routes} from  'react-router-dom';
import Home from "./pages/home";
import Doctors from './pages/doctors';
import Login from './pages/login';
import About from './pages/About';
import Contact from './pages/contact';
import Myprofile from './pages/myprofile';
import MyAppointments from './pages/myAppointments';
import Appointment from './pages/appointment';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='mx-4 $m:mx-[10%]'>
        <ToastContainer />
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/doctors" element={<Doctors/>}/>
          <Route path="/doctors/:speciality" element={<Doctors/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/my-profile" element={<Myprofile/>}/>
          <Route path="/my-appointments" element={<MyAppointments/>}/>
          <Route path="/appointment/:docId" element={<Appointment/>}/>
        </Routes>
        <Footer/>
        
    </div>
  )
}

export default App;
