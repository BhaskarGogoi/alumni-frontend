import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './styles.css'
import OneSignal from 'react-onesignal';

//layout for navbar pages
import WithNav from './Layouts/WithNav'
//Pages
import Login from './pages/Login';
import VerifyLoginOtp from './pages/VerifyLoginOTP';
import Register from './pages/Register';

import { IndexPage, About, Contact, EventDetails, AllEvents, AllAlumni, AlumniDetails, Contribute, Testimonial } from './pages/index';

//User Auth Pages
import {
  Dashboard,
  CompleteProfile,
  UploadImage,
  Payment,
  Profile,
  Settings,
  Notifications,
  AllNotifications,
  SearchAlumni
} from './pages/index';
import ProtectedRoutes from './auth/ProtectedRoutes';
import CheckAuth from './auth/CheckAuth';
import Logout from './auth/Logout';

const App = () => {
  useEffect(() => {
    const initOneSignalService = async () => {
      await OneSignal.init({ appId: '349ed92b-68ca-47ec-97f7-9759a8a3e937' });
    }
    initOneSignalService();
  })
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<CheckAuth />}>
            <Route path='/login' page="login" element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/verify-login-otp' element={<VerifyLoginOtp />} />
          <Route path="/" element={<WithNav />}>
            <Route index element={<IndexPage />} />
            <Route path='/alumni' element={<AllAlumni />} />
            <Route path='/alumni-details' element={<AlumniDetails />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/event' element={<EventDetails />} />
            <Route path='/all-events' element={<AllEvents />} />
            <Route path='/all-notifications' element={<AllNotifications />} />
            <Route path='/search-alumni' element={<SearchAlumni />} />
          </Route>
          <Route path="/user" element={<ProtectedRoutes />}>
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path='complete-profile' element={<CompleteProfile />} />
            <Route path='upload-image' element={<UploadImage />} />
            <Route path='payment' element={<Payment />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='contribute' element={<Contribute />} />
            <Route path='testimonial' element={<Testimonial />} />
            <Route path='logout' element={<Logout />} />
            {/* <Route path='/about' element={<About/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='*' element={<div>404</div>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
