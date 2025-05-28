import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/fetchWeather';
import { toast } from 'sonner';
import { supabase } from '../lib/supabaseClient.js';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState(() => localStorage.getItem('lastCity'));
    const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'C');
    const [days, setDays] = useState(4);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initFetchDone, setInitFetchDone] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setIsLoggedIn(!!data.session);
        };
        getSession();
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        if (isLoggedIn && !city && !initFetchDone) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const coords = `${position.coords.latitude},${position.coords.longitude}`;
                        setCity(coords);
                        localStorage.setItem('lastCity', coords);
                        setInitFetchDone(true);
                    },
                    () => {
                        setCity('New Delhi');
                        localStorage.setItem('lastCity', 'New Delhi');
                        setInitFetchDone(true);
                    }
                );
            } else {
                setCity('New Delhi');
                localStorage.setItem('lastCity', 'New Delhi');
                setInitFetchDone(true);
            }
        }
    }, [isLoggedIn, city, initFetchDone]);

    const toggleUnit = () => {
        const newUnit = unit === 'C' ? 'F' : 'C';
        setUnit(newUnit);
        localStorage.setItem('unit', newUnit);
    };

    const getWeather = (newCity) => {
        setCity(newCity);
    };

    const {
        data: weather,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['weather', city, days],
        queryFn: async () => {
            toast.loading('Getting Weather...');
            try {
                const data = await fetchWeather(city, days);
                toast.dismiss();
                toast.success('Weather fetched!');
                localStorage.setItem('lastCity', city);
                return data;
            } catch (err) {
                toast.dismiss();
                toast.error('Invalid city name. Showing previous valid city’s data.');
                throw err;
            }
        },
        enabled: !!city && isLoggedIn,
        staleTime: 30000,
        refetchInterval: 30000,
        retry: false,
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
