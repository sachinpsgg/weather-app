import React from 'react';

const DaysSelector = ({ selected, onSelect }) => {
    const options = [1, 4, 7];

    return (
        <div className="flex justify-center gap-2 mt-3">
            {options.map((day) => (
                <button
                    key={day}
                    onClick={() => onSelect(day)}
                    className={`px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md text-xs ${
                        selected === day
                            ? 'bg-white text-blue-900'
                            : 'text-white hover:bg-blue-800'
                    }`}
                >
                    {day} Day{day > 1 ? 's' : ''}
                </button>
            ))}
        </div>
    );
};

export default DaysSelector;
