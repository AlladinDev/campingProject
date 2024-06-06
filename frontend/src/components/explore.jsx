import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import api from './baseApi'
import { loadStripe } from '@stripe/stripe-js'
import { addTrip } from '../redux/tripsSlice'
import { useNavigate } from 'react-router-dom'
function Explore() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const authStatus = useSelector((state) => state.user.authStatus)
  const email = useSelector((state) => state.user.user.email)
  console.log('auth status from explore page is', authStatus)
  const fetchData = async () => {
    const response = await api.get('/api/trips/getalltrips')
    console.log(response)
    dispatch(addTrip(response.data.trips))
    setTrips(response.data.trips)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const payment = async (price, tripId) => {
    try {
      const userResponse = await api.post('/api/user/addtrip', { email, tripId })
      console.log('result from add trip for user', userResponse.status)
      const stripe = await loadStripe(process.env.REACT_APP_striyPublishableKey);
      const response = await api.post('/api/trips/checkoutTrip', { amount: price });
      const session = response.data.session;
      console.log('response is checout', response)
      const result = stripe.redirectToCheckout({
        sessionId: session
      })
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='flex justify-around gap-3 my-2 flex-wrap p-2  items-center bg-[#FEFAF6] min-h-[90vh]'>
      {
        trips.length ? trips.map((trip, keys) => (
          <div key={keys} className="w-full min-[670px]:max-w-[380px] min-[670px]:min-h-[29rem]  bg-white shadow-lg border hover:scale-105 hover:text-black transition duration-700 border-black rounded-lg p-3 ">
            <div className='w-full'>
              <img
                className="w-full  max-h-[23rem] object-fit border border-black"
                src={trip.photo}
                alt="trip photo"
              />
            </div>
            <div className="py-4 px-6 w-full">
              <h2 className="text-xl  text-center font-semibold text-gray-800 mb-2">
                {trip.destination}
              </h2>
              <h1 className="text-lg my-1 text-black">
                Trip Type: {trip.tripType}
              </h1>
              <h1 className="text-lg my-1 text-black">
                Difficulty: {trip.difficulty}
              </h1>
              <h1 className="text-lg my-1 text-black">
                Date: {trip.date}
              </h1>
              <h1>Trip Id : {trip._id}</h1>
              <hr />
              <h1 className='my-1'>Duration :{trip.tripDuration} Days</h1>
              <h1>{trip.duration}</h1>
              <hr />

            </div>
            <div className='w-full flex justify-center items-center  py-2 my-2'>
              <button className='w-full btn rounded-full bg-blue-700 text-white text-2xl' onClick={() => navigate(`/tripinfo/${trip._id}`)}>Get Trip info</button>
            </div>
          </div>
        )) : <div className='min-h-[90vh] w-full flex justify-center items-center'>
          <h3 className='text-2xl text-center text-black p-9 shadow-lg rounded-md flex justify-center items-center  min-h-[12rem] hover:scale-105 transition-all duration-500 bg-white'>Sorry We haven't planned Any Trip yet</h3>
        </div>
      }

    </div>
  )
}

export default Explore
