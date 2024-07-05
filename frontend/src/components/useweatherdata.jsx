import { React, useEffect, useState } from 'react'
import axios from 'axios';
function useweatherdata(location) {
    console.log('prop is',location)
    const [weatherInfo, setWeatherInfo] = useState('');
    const [weatherErr, setWeatherErr] = useState('');
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                console.log('entered',location)
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=2ef5cbc55ea643a59bc91851243105&q=${location}&aqi=no`);
                console.log(response)
                setWeatherInfo(response.data);
               console.log('weatherinfo from hook is', response.data)
            } catch (err) {
                setWeatherErr("Sorry, Weather Update Not Available");
            }
        };
        fetchWeather();
    }, [location]);
    return [
        weatherInfo, weatherErr]

}
export default useweatherdata
