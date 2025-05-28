import React, {useEffect} from 'react';
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import { useWeather } from '../context/WeatherContext';
import {WeatherHeader} from "../components/WeatherHeader.jsx";
import Error from "../components/Error.jsx";

const Dashboard = () => {
    const { weather, error, getWeather,city } = useWeather();

    useEffect(() => {
        if (!city) {
            const lastCity = localStorage.getItem('lastCity');
            if (lastCity) {
                getWeather(lastCity);
            } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const coords = `${position.coords.latitude},${position.coords.longitude}`;
                        getWeather(coords);
                    },
                    () => getWeather('New Delhi')
                );
            } else {
                getWeather('New Delhi');
            }
        }
    }, [city]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
            <WeatherHeader userName="Hi" />
            {error && <Error message={error} />}
            {weather && (
                <>
                    <CurrentWeather weather={weather}  />
                    <DailyForecast forecast={weather.forecast.forecastday} />
                </>
            )}
        </div>
    );
};
export default Dashboard