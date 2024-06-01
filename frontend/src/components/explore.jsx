import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { addTrip } from '../redux/tripsSlice'
function Explore() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const authStatus = useSelector((state) => state.user.authStatus)
  const email = useSelector((state) => state.user.user.email)
  console.log('auth status from explore page is', authStatus)
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/api/trips/getalltrips')
    console.log(response)
    dispatch(addTrip(response.data.trips))
    setTrips(response.data.trips)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const payment = async (price, tripId) => {
    try {
      const userResponse = await axios.post('http://localhost:8000/api/user/addtrip', { email, tripId })
      console.log('result from add trip for user', userResponse.status)
      const stripe = await loadStripe('pk_test_51P928jSG2H8tvxJlySEKWcC4kJt5ERdwMBNmSfFQHKj10FbuT4whK2Q3SXAkGAWZeTOZPY6L70Lf95wRzH81SBB400TC0njwbE');
      const response = await axios.post('http://localhost:8000/api/trips/checkoutTrip', { amount: price });
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
        trips && trips.map((trip, keys) => (
          <div key={keys} className="w-full min-[670px]:max-w-[380px] min-[670px]:h-[29rem]  bg-white shadow-lg border hover:scale-105 hover:text-black transition duration-700 border-black rounded-lg p-3 ">
            <div className='w-full'>
              <img
                className="w-full  max-h-[23rem] object-fit border border-black"
                src={trip.photo}
                alt="trip photo"
              />
            </div>
            <div className="py-4 px-6 w-full">
              <h2 className="text-xl  text-center font-semibold text-gray-800 mb-2">
                {trip.destination.split[0]}
              </h2>
              <h1 className="text-lg my-1 text-black">
                Date: {trip.date}
              </h1>
              <h1 className='my-1'>Duration :{trip.tripDuration} Days</h1>
                <h1>Moderate-Diffult</h1>
                <hr />
                <div className='w-full py-2 my-2'>
                  <button onClick={payment}>JOin now</button>
                  <button className='w-full py-2 rounded-full bg-blue-700 text-white text-2xl' onClick={() => navigate(`/tripinfo/${trip._id}`)}>Get Trip info</button>
                </div>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Explore
