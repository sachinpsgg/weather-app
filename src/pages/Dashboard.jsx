import React from 'react';
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import { useWeather } from '../context/WeatherContext';
import {WeatherHeader} from "../components/WeatherHeader.jsx";
import {Loader2} from "lucide-react";

const Dashboard = () => {
    const { isFetching, isError, weather } = useWeather();

    if (isError || !weather) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 text-white text-xl">
                <WeatherHeader/>
                Unable to fetch weather data. Please check the city name.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
            <WeatherHeader userName="Hi" />
            {isFetching ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin h-10 w-10 text-white mb-4" />
                    <p className="text-white text-lg">Fetching weather data...</p>
                </div>
            ) : (
                <>
                    <CurrentWeather />
                    <DailyForecast />
                </>
            )}
        </div>
    );
};
export default Dashboard;