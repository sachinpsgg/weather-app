

import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/fetchWeather';
import {toast} from "sonner";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState(() => localStorage.getItem('lastCity') || 'New Delhi');
    const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C');
    const [days, setDays] = useState(4);

    const toggleUnit = () => {
        const newUnit = unit === 'C' ? 'F' : 'C';
        setUnit(newUnit);
        localStorage.setItem('unit', newUnit);
    };

    const getWeather = (newCity) => {
        setCity(newCity);
        localStorage.setItem('lastCity', newCity);
    };

    const {
        data: weather,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ['weather', city, days],
        queryFn: () => {
            toast.loading('Getting Weather...');
            return fetchWeather(city, days)
                .then((data) => {
                    toast.dismiss(); // remove loading
                    toast.success('Weather fetched!');
                    return data;
                })
                .catch((err) => {
                    toast.dismiss(); // remove loading
                    toast.error('Error fetching weather!');
                    throw err;
                });
        },
        enabled: !!city && !!days,
        staleTime: 30000,
        refetchInterval: 30000,
        retry: 1,
    });

    return (
        <WeatherContext.Provider
            value={{
                city,
                getWeather,
                weather,
                isLoading,
                isError,
                error,
                isFetching,
                refetch,
                unit,
                toggleUnit,
                days,
                setDays,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => useContext(WeatherContext);
