import React from 'react'
import {  useSelector } from 'react-redux'
function TripsAndTreks() {
    const trips = useSelector((state) => state.tripStore.tripData)
    return (
        <div className='flex justify-around gap-2 my-2 flex-wrap items-center'>
            {
                trips.length!==0 ? trips.map((trip, keys) => (
                    <div key={keys} className="w-full sm:max-w-[340px] bg-white shadow-lg border hover:bg-blue-300  hover:text-black transition duration-700 border-black rounded-lg overflow-hidden">
                        <img
                            className="w-full h-56 object-cover object-center"
                            src={trip.photo}
                            alt="trip photo"
                        />
                        <div className="py-4 px-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {trip.destination}
                            </h2>
                            <p className="text-lg text-gray-600">
                                Date: {trip.date}
                            </p>
                            <p className="text-lg text-gray-600">
                                Trek Duration: {trip.tripDuration}
                            </p>
                            <p className="text-lg text-gray-600">
                                Services: {trip.tripServices}
                            </p>
                            <hr />
                            <div className="flex mt-4">
                                <img
                                    className="w-10 h-10 rounded-full mr-4 object-cover object-center"
                                    src={trip.guideAllotted.photo}
                                    alt="guide photo"
                                />
                                <div className=' w-full'>
                                    <p className="text-lg text-gray-900"> Guide: {trip.guideAllotted.username}</p>
                                    <p className="text-lg text-gray-600"> Mobile:  {trip.guideAllotted.mobile}</p>
                                </div>

                            </div>
                            <div className='w-full my-1'>
                                <button className='w-full py-2 rounded-full bg-blue-700' onClick={() => `${authStatus ? payment(trip.price, trip._id) : navigate('/userlogin')}`}>Join</button>
                            </div>
                        </div>
                    </div>
                )) : <div className='min-h-[90vh] flex justify-center items-center'>
                    <h3 className='text-2xl text-center text-black p-9 shadow-lg rounded-md flex justify-center items-center  min-h-[12rem] hover:scale-105 transition-all duration-500 bg-white'>No Trips Planned Yet</h3>
                </div>
            }
        </div>


    )
}


export default TripsAndTreks
