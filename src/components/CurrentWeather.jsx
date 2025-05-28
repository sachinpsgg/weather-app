import {useWeather} from "../context/WeatherContext.jsx";
import {Card} from "./ui/Card.jsx";
import {Wind, Droplets, Sunrise, Sunset, Moon, SunMoon, LocationEditIcon} from 'lucide-react'
import DaysSelector from "./DaysSelector.jsx";
export default function CurrentWeather({ weather }) {
    const { unit ,days,setDays,getWeather} = useWeather();
    const temperature = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;

    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const dateString = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <Card className="lg:col-span-2 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 border-0 text-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-6xl font-light mb-2">
                                {weather.location.name},{weather.location.region},{weather.location.country}
                            </h1>
                            <h2 className="text-6xl font-light mb-2">{timeString}</h2>
                            <p className="text-blue-100 text-lg">{dateString}</p>
                        </div>
                        <img src={`https:${weather.current.condition.icon}`} alt="icon"/>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-2">Weather Forecast</h3>
                        <h4 className="text-2xl font-semibold mb-2">{weather.current.condition.text}</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-100 bg-white/10 p-4 rounded-lg mt-4">
                        <div>
                            <Sunrise />
                            <p className="font-semibold">Sunrise</p>
                            <p>{weather.forecast.forecastday[0].astro.sunrise}</p>
                        </div>
                        <div>
                            <Sunset/>
                            <p className="font-semibold">Sunset</p>
                            <p>{weather.forecast.forecastday[0].astro.sunset}</p>
                        </div>
                        <div>
                            <Moon />
                            <p className="font-semibold">Moonrise</p>
                            <p>{weather.forecast.forecastday[0].astro.moonrise}</p>
                        </div>
                        <div>
                            <SunMoon />
                            <p className="font-semibold">Moonset</p>
                            <p>{weather.forecast.forecastday[0].astro.moonset}</p>
                        </div>
                    </div>
                </div>
            </Card>


            <Card className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 border-0 text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                        <img src={`https:${weather.current.condition.icon}`} alt="icon"/>
                    </div>

                    <div className="text-center mb-6">
                        <div className="text-5xl font-light mb-2">
                            {temperature}°{localStorage.getItem("unit")}
                        </div>
                        <p className="text-blue-200">{weather.current.condition.text}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-blue-300" />
                                <span className="text-sm text-blue-200">Wind</span>
                            </div>
                            <span className="text-sm font-medium">{weather.current.wind_kph} Km/h</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-blue-300" />
                                <span className="text-sm text-blue-200">Hum</span>
                            </div>
                            <span className="text-sm font-medium">{weather.current.humidity}%</span>
                        </div>
                    </div>


                    <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">Weather Forecast</span>
                        </div>
                        <DaysSelector selected={days} onSelect={setDays} />
                    </div>
                </div>
            </Card>
        </div>
    );
}
