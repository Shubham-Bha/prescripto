import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/adminContext';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/admin/dashBoard';
import AllAppointments from './pages/admin/allAppointments';
import AddDoctor from './pages/admin/addDoctor';
import DoctorsList from './pages/admin/doctorsList';
import { DoctorContext } from './context/doctorContext';
import DoctorDashboard from './pages/doctor/doctorDashboard';
import DoctorAppointment from './pages/doctor/doctorAppointment';
import DoctorProfile from './pages/doctor/doctorProfile';
const App = () => {
  
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<DashBoard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
          {/* doctors route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          <Route path='/doctor-appointments' element={<DoctorAppointment/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
