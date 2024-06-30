// AdminPage.js
import { React, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { faHome, faBars, faUsers, faArrowCircleLeft, faMountain, faImage, faCog, faMessage, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import api from './baseApi';
import { addUsers } from '../redux/allusersSlice';
import { addMembers } from '../redux/teamMemberSlice';
import { removeAdvertisement } from '../redux/advertisementSlice';
const AdminPage = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const location = useLocation()
  const advertisement = useSelector((state) => state.advertisementStore.advertisement)
  const advertisementPresent = useSelector((state) => state.advertisementStore.advertisementPresent)
  const fetchAllUsers = async () => {
    try {//api for getting all users
      const response = await api.get('/api/user/getallusers')
      dispatch(addUsers(response.data.users))//add all users to redux allUsersSlice
    }
    catch (err) {
      console.log("err from admin page getting users", err)
    }
  }
  const fetchAllMembers = async () => {//get all team members and add them to guideslice in redux
    const response = await api.get('/api/guide/getallguides')
    console.log('guide response is', response)
    dispatch(addMembers(response.data.users))
  }
  useEffect(() => {
    fetchAllUsers()
    fetchAllMembers()
  }, [])
  window.addEventListener('resize', () => {
    //this is because on smaller devices less than 670 px admin page has its own sidebard as navigation pannel
    //so this navbar should hide at that time
    const width = window.innerWidth
    if (width <= '700') {
      setIsOpen(true)
    }
    else if (width > '700') {
      setIsOpen(false)
    }
  })
  const deleteAdvertisement = async () => {
    try {
      const response = await api.delete('/api/advertisement/deleteadvertisement', { data: { id: advertisement._id } })
      console.log(response.data)
      alert('advertisement deleted successfully')
      dispatch(removeAdvertisement())

    }
    catch (err) {
      console.log(err)

    }
  }
  const toggleDashboard=()=>{
    setIsOpen(false)
    setShowDashboard(!showDashboard)
  }
  const user = useSelector((state) => state.user.user)
  return (
    <>
      <div className="flex relative custom-scrollbar bg-no-repeat  bg-[url(../../adminpage.jpg)] bg-cover h-[92vh] min-[700px]:h-[92vh]">
        {/* Sidebar */}
        <div className={`${isOpen && 'hidden'} transition-all duration-700 overflow-hidden overflow-y-auto  h-[92vh]  hidescrollbar bg-white bg-opacity-15 backdrop-blur-lg  rounded shadow-lg`}>   
            <div className="p-4">
              <h1 className="text-white text-2xl font-semibold mx-auto">Adventure Admin</h1>
            </div>
            <div className=' flex justify-center items-center'>
              <h2 className='' onClick={() =>toggleDashboard()}> <FontAwesomeIcon icon={faArrowCircleLeft} className="h-10 bg-white p-2 rounded-full w-10 block min-[700px]:hidden" /></h2>
            </div>
            <div className="p-4">
              <h1 className="text-white text-2xl font-semibold">
                <img src={user.photo} alt="" className='w-[5rem] hover:scale-150 hover:border-white transition-all duration-1000   mx-auto aspect-square rounded-full border-2 border-green-700' />
              </h1>
            </div>
            <nav className="my-6">
              <Link to="/adminpage" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link to="/adminpage/addtrip" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2" />
                Add Trip
              </Link>
              <Link to="/adminpage/allusers" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-2" />
                Users
              </Link>
              <Link to="/adminpage/allmembers" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-2" />
                Team Members
              </Link>
              <Link to="/adminpage/guideregister" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-2" />
                Add Member
              </Link>
              {!advertisementPresent && <Link to="/adminpage/advertisement" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faMessage} className="h-5 w-5 mr-2" />
                Add Advertisement
              </Link>}
              {advertisementPresent && <button onClick={deleteAdvertisement} className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faMessage} className="h-5 w-5 mr-2" />
                Remove Advertisement
              </button>}
              <Link to="/adminpage/tripsAndTreks" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faMountain} className="h-5 w-5 mr-2" />
                Trips & Treks
              </Link>
              <Link to="/adminpage/feedbacks" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faMessage} className="h-5 w-5 mr-2" />
                Feedbacks
              </Link>
              <Link to="/adminpage/addtogallery" className="flex items-center py-2 px-4 text-white hover:bg-green-700">
                <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2" />
                Add To gallery
              </Link>
            </nav>
        </div>
        {/* Main Content */}
        <div className="flex-1 z-0 relative h-[92vh]  border-2 border-red-500 overflow-auto  text-white  ">
          <div className='rightNavbar  border border-black sticky top-0 z-10 text-2xl flex justify-evenly items-center bg-white bg-opacity-20 backdrop-blur-lg py-2 mb-4'>
            <h2 className=' ' onClick={() => toggleDashboard()}> <FontAwesomeIcon icon={faBars} className="h-10 w-10 block min-[700px]:hidden " /></h2>
            <h2 className='hidden md:block '>Admin Dashboard</h2>
            <h2 className='relative '>Admin_Name: {user.username}</h2>
          </div>
          <Outlet />
        </div>
      </div>
    </>

  );
};

export default AdminPage;