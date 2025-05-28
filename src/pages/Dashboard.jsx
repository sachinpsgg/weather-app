import React from 'react';
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import { useWeather } from '../context/WeatherContext';
import { WeatherHeader } from "../components/WeatherHeader.jsx";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
    const { isFetching, isError, weather } = useWeather();
    const showError = !isFetching && (isError || !weather);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 text-white">
            <WeatherHeader userName="Hi" />
            {isFetching && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin h-10 w-10 text-white mb-4" />
                    <p className="text-lg">Fetching weather data...</p>
                </div>
            )}
            {showError && (
                <div className="flex justify-center items-center py-20">
                    <p className="text-red-600 text-lg">Enter Correct City...</p>
                </div>
            )}
            {!isFetching && !isError && weather && (
                <>
                    <CurrentWeather />
                    <DailyForecast />
                </>
            )}
        </div>
    );
};

export default Dashboard;
