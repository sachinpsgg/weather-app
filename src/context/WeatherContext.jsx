// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { fetchWeather } from '../api/fetchWeather';
//
// const WeatherContext = createContext();
//
// export const WeatherProvider = ({ children }) => {
//     const [city, setCity] = useState(() => {
//         return localStorage.getItem('lastCity') || 'New Delhi';
//     });
//     const [weather, setWeather] = useState(null);
//     const [error, setError] = useState('');
//     const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C'); // 🌡️
//
//     const getWeather = async (searchCity,days) => {
//         try {
//             setError('');
//             const data = await fetchWeather(searchCity,days);
//             setCity(searchCity);
//             setWeather(data);
//             localStorage.setItem('lastCity', searchCity);
//         } catch (err) {
//             setError('City not found');
//         }
//     };
//     const toggleUnit = () => {
//         const newUnit = unit === 'C' ? 'F' : 'C';
//         setUnit(newUnit);
//         localStorage.setItem('unit', newUnit);
//     };
//     useEffect(() => {
//         getWeather(city,4); // Fetch when app loads
//     }, []);
//
//     return (
//         <WeatherContext.Provider value={{ city, weather, error, getWeather,unit,toggleUnit }}>
//             {children}
//         </WeatherContext.Provider>
//     );
// };
//
// export const useWeather = () => useContext(WeatherContext);

import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/fetchWeather';

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
    } = useQuery({
        queryKey: ['weather', city, days],
        queryFn: () => fetchWeather(city, days),
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
