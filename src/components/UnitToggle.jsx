import React from 'react';
import { useWeather } from '../context/WeatherContext';

const UnitToggle = () => {
    const { unit, toggleUnit } = useWeather();

    return (
        <button
            onClick={toggleUnit}
            className="ml-auto bg-blue-800 text-white px-3 py-1 rounded-full hover:bg-blue-700"
        >
            {unit === 'C' ? 'Show °F' : 'Show °C'}
        </button>
    );
};

export default UnitToggle;
