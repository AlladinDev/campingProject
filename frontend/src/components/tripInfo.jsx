import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faPhone, faFire, faHiking, faMapMarkedAlt, faStar, faTree } from '@fortawesome/free-solid-svg-icons';
import MapComponent from './leafletmap';
import useweatherdata from './useweatherdata';
import Weathercard from './weathercard';
export default function TripInfo() {
    const { id: tripId } = useParams()
    const trip = useSelector((state) => state.tripStore.tripData);
    const [weatherErr, setWeatherErr] = useState('');
    const tripData = trip.filter((item) => item._id === tripId)[0];
    console.log('tridata is', tripData)
    const [weatherInfo, weatherApiErr] = useweatherdata(tripData.destination);

    console.log('hi ', weatherInfo)
    const markers = [
        { lat: 33.55, lng: 75.25, popupText: 'Destination Site' },

        // Add more markers as needed
    ];


    return (
        tripData && (
            <div className='min-h-[90vh] bg-[#FEFAF6]'>
                <div className="imagediv border-2 border-red-800">
                    <img src={tripData.photo} alt="" className='object-cover w-full' />
                </div>
                <h2 className='text-3xl text-center my-2'>{tripData.destination}</h2>
                <div className='p-3 text-center border my-2 shadow-sm'>
                    {tripData.description}
                </div>
                <div className='flex gap-4 flex-col min-[780px]:flex-row justify-around items-center p-4 my-2'>
                    <div className='w-full max-w-[480px] text-center bg-white shadow-gray-700 min-h-[50vh] p-4 shadow-lg rounded-sm'>
                        <h2 className='text-3xl text-center my-4 font-bold'>Trip Details</h2>
                        <table className='w-full text-left mb-4'>
                            <tbody>
                                <tr>
                                    <td className='text-2xl font-semibold'>Destination:</td>
                                    <td className='text-2xl'>{tripData.destination}</td>
                                </tr>
                                <tr>
                                    <td className='font-semibold'>Duration:</td>
                                    <td>{tripData.tripDuration} days</td>
                                </tr>
                                <tr>
                                    <td className='font-semibold'>Price:</td>
                                    <td>{tripData.price} Rs</td>
                                </tr>
                                <tr>
                                    <td className='font-semibold'>Difficulty:</td>
                                    <td>Moderate</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className='underline text-2xl font-bold mb-2'>Guide Details</h2>
                        <table className='w-full text-left mb-4'>
                            <tbody>
                                <tr>
                                    <td className='font-semibold'>Guide Name:</td>
                                    <td className='font-bold'>{tripData.guideAllotted.username}</td>
                                </tr>
                                <tr>
                                    <td className='font-semibold'>Guide Pic:</td>
                                    <td>
                                        <img src={tripData.guideAllotted.photo} alt="Guide" className='w-[4rem] aspect-square rounded-full border-2 border-gray-300' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className='p-2 py-2 my-2 rounded-md text-2xl bg-yellow-200'>
                            Contact Guide <FontAwesomeIcon size='2x' icon={faPhone} className='ml-2 text-blue-600' />
                        </h2>
                        <h2 className='p-2 py-2 w-full bg-blue-600 rounded-md text-white cursor-pointer hover:bg-blue-700'>
                            Join Now
                        </h2>
                    </div>
                    <div className="bg-blue-200 w-full max-w-[480px] rounded-lg shadow-lg my-2 p-9">
                        <h2 className="text-xl font-semibold mb-4">Why Join Us?</h2>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faCampground} className="text-green-600 mr-2" />
                            <p>Explore scenic campgrounds</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faFire} className="text-orange-600 mr-2" />
                            <p>Experience cozy bonfires</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faHiking} className="text-brown-600 mr-2" />
                            <p>Discover thrilling hiking trails</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-red-600 mr-2" />
                            <p>Navigate through exciting outdoor adventures</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-600 mr-2" />
                            <p>Enjoy stargazing in clear night skies</p>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faTree} className="text-green-800 mr-2" />
                            <p>Connect with nature in tranquil settings</p>
                        </div>
                    </div>
                </div>
                {weatherInfo &&
                    <> <h2 className='text-2xl font-bold m-4 bg-[#BFDBFE] p-4 text-center shadow-md'>Weather Update</h2>
                        <Weathercard data={weatherInfo.current} />
                        <div className='min-h-[40vh] my-2 w-full flex flex-col justify-center items-center'>
                            <h3 className='text-2xl font-bold my-2'>Location Map</h3>
                            <MapComponent markers={[{ lat: weatherInfo.location.lat, lng: weatherInfo.location.lon, popupText: "Destination Area" }]} />
                        </div>
                    </>}
                {weatherApiErr && <div className='w-full min-h-[10vh]  flex justify-center items-center'><h2 className='text-3xl p-3  bg-white w-full max-w-[300px] text-center  flex justify-center items-center  shadow-lg aspect-video  my-2 border border-black'>No Weather And Map Available For this Area</h2> </div>}
            </div>

        )
    );
}
