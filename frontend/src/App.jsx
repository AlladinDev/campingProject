import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import axios from 'axios';
import generateFingerprint from './deviceFinder';
import { useDispatch } from 'react-redux';
import { addTrip } from './redux/tripsSlice';
import { addDeviceID, addAuthStatus, addUserType, addUser, addUserEmail } from './redux/userSlice';
import TripInfo from './components/tripInfo';
import Advertisement from './components/advertisement';
import { addAdvertisement } from './redux/advertisementSlice';


// Lazy-loaded components
const Home = lazy(() => import('./components/home'));
const Explore = lazy(() => import('./components/explore'));
const UserRegister = lazy(() => import('./components/userRegister'));
const GuideRegister = lazy(() => import('./components/guideRegister'));
const LoginForm = lazy(() => import('./components/login'));
const OtpForm = lazy(() => import('./components/otp'));
const Gallery = lazy(() => import('./components/gallery'));
const UserPage = lazy(() => import('./components/userPage'));
const AdminPage = lazy(() => import('./components/adminPage'));
const GuidePage = lazy(() => import('./components/guidePage'));
const Protected = lazy(() => import('./components/protected'));
const Feedback = lazy(() => import('./components/feedback'));
const AddTrip = lazy(() => import('./components/addTrip'));
const AllUsers = lazy(() => import('./components/allUsers'));
const AllMembers = lazy(() => import('./components/allMembers'));
const PaymentSuccess = lazy(() => import('./components/paymentSuccess'));
const PaymentFailure = lazy(() => import('./components/paymentFailure'));
const TripsAndTreks = lazy(() => import('./components/tripsAndTreks'));
const Dashboard = lazy(() => import('./components/dashboard'));
const AddToGallery = lazy(() => import('./components/addtogallery'));
const AboutUs = lazy(() => import('./components/aboutus'));
const AllFeedBackMessages = lazy(() => import('./components/adminfeedbacks'))
const OtpProtected = lazy(() => import('./components/otpProtected'))
import api from './components/baseApi';
function App() {

  const dispatch = useDispatch();
  const fetchTreks = async () => {
    try {
      const response = await api.get('/api/trips/getalltrips')
      dispatch(addTrip(response.data.trips))
    }
    catch (err) {
      console.log(err)
    }
  }
  const fetchAdvertisement = async () => {
    try {
      const response = await api.get("/api/advertisement/getadvertisement")
      dispatch(addAdvertisement(response.data.advertisement))
    }
    catch (err) {
      console.log('err in fetchadvertisement function')
    }
  }
  useEffect(() => {
    fetchAdvertisement()
    fetchTreks()
    generateFingerprint().then(async (id) => {
      dispatch(addDeviceID(id));
      const response = await api.post('/api/checkAuthStatus', { userID: id }, {
        withCredentials: true
      });
      if (response.request.status === 200) {
        dispatch(addUserType(response.data.userType));
        dispatch(addUserEmail(response.data.user.email))
        dispatch(addAuthStatus(true));
        dispatch(addUser(response.data.user));
      }
    }).catch((err) => console.log('err is', err));
  }, []);

  return (
    <div className='w-full min-h-[100vh] font-serif'>
      <Navbar />
      <Suspense fallback={<div className='text-center text-black font-serif'>Loading...</div>}>
        <Routes>
          <Route exact path='/gallery' element={<Gallery />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/aboutus' element={<AboutUs />} />
          <Route exact path='/explore' element={<Explore />} />
          <Route exact path='/tripinfo/:id' element={<TripInfo />} />
          <Route exact path='/paymentsuccess/:tripId' element={<PaymentSuccess />} />
          <Route exact path='/paymentfailure' element={<PaymentFailure />} />
          <Route exact path='/userregister' element={<UserRegister />} />
          <Route exact path='/userlogin' element={<LoginForm />} />
          <Route element={<OtpProtected />}>
            <Route exact path='/otpform' element={<OtpForm />} />
          </Route>
          <Route element={<Protected />} >
            <Route exact path='/userpage' element={<UserPage />} />
            <Route exact path='/guidepage' element={<GuidePage />} />
            <Route exact path='/adminpage' element={<AdminPage />} >
              <Route exact path='/adminpage' element={<Dashboard />} />
              <Route exact path='/adminpage/addtogallery' element={<AddToGallery />} />
              <Route exact path='/adminpage/guideRegister' element={<GuideRegister />} />
              <Route exact path='/adminpage/addfeedback' element={<Feedback />} />
              <Route exact path='/adminpage/advertisement' element={<Advertisement />} />
             
              <Route exact path='/adminpage/allUsers' element={<AllUsers />} />
              <Route exact path='/adminpage/allmembers' element={<AllMembers />} />
              <Route exact path='/adminpage/feedbacks' element={<AllFeedBackMessages />} />
              <Route exact path='/adminpage/addtrip' element={<AddTrip />} />
              <Route exact path='/adminpage/tripsAndTreks' element={<TripsAndTreks />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
