import { LogOut } from 'lucide-react';
import {useWeather} from "../context/WeatherContext.jsx";
import SearchBar from "./SearchBar.jsx";
import React, {useState} from "react";
import {Switch} from "./ui/Switch.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/Avatar.jsx";
import {supabase} from "../lib/supabaseClient.js";
import {useNavigate} from "react-router-dom";

export function WeatherHeader() {
    const { unit, toggleUnit,getWeather,days } = useWeather();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const currentTime = new Date();
    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };
    return (
        <div className="flex flex-col py-2">
            <div className="flex items-center justify-between w-full mb-6">
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-semibold text-white mb-1">
                        {getGreeting()}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white">
                            <span className={unit === 'C' ? 'font-semibold' : 'text-white/60'}>°C</span>
                            <Switch
                                checked={unit === 'F'}
                                onCheckedChange={toggleUnit}
                                className="relative inline-flex h-5 w-10 rounded-full bg-white/30 transition"
                            >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-red-600 shadow transition ${
                                    unit === 'F' ? 'translate-x-5' : 'translate-x-1'
                                }`}
                            />
                            </Switch>
                            <span className={unit === 'F' ? 'font-semibold' : 'text-white/60'}>°F</span>
                        </div>
                        <div className="relative">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setShowMenu((prev) => !prev)}
                            >
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={localStorage.getItem("username")}/>
                                    <AvatarFallback className="bg-white/20 text-white text-sm">
                                        {localStorage.getItem("username").charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-32 bg-white text-gray-700 rounded shadow z-20">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar onSearch={(city) => getWeather(city, days)} />
        </div>

    );
}
