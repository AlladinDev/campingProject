import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWind, faTint, faThermometerHalf} from '@fortawesome/free-solid-svg-icons';
function Weathercard({data}) {
    console.log(data)
    return (
        <div>
            {data && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-9 m-4 shadow-xl">
                    <h2 className="text-3xl font-bold mb-4 text-center">Current Weather </h2>
                    <div className="flex flex-col md:flex-row items-center justify-around w-full text-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img src={data.condition.icon} alt="Weather Icon" className="w-[9rem] h-[9rem] animate-bounce" />
                            <p className="text-4xl font-semibold ml-2">{data.temp_c}°C  {data.condition.text}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faWind} className="text-white mr-2" />
                                <p>{data.wind_kph} kph</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faTint} className="text-white mr-2" />
                                <p>{data.humidity}% Humidity</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faThermometerHalf} className="text-white mr-2" />
                                <p>Feels like: {data.feelslike_c}°C</p>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weathercard
