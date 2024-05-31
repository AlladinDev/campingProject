import React, { useEffect } from 'react';

const WeatherAPIWidget = () => {
    const showPosition = (position) => {
        console.log(position)
    }
    const showError = () => {

    }
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(showPosition, showError);
        const script = document.createElement('script');
        script.src = 'https://www.weatherapi.com/weather/widget.ashx?loc=1133466&wid=1&tu=2&div=weatherapi-weather-widget-1';
        script.async = true;
        document.getElementById('weatherapi-weather-widget-1').appendChild(script);
    }, []);

    return (
        <div>
            <div id="weatherapi-weather-widget-1"></div>
            <noscript>
                <a href="https://www.weatherapi.com/weather/q/srinagar-1133466" alt="Hour by hour Srinagar weather">
                    10 day hour by hour Srinagar weather
                </a>
            </noscript>
        </div>
    );
};

export default WeatherAPIWidget;
