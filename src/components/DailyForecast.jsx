const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
};

export default function DailyForecast({ forecast }) {
    return (
        <div className=" p-4 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 border-0 mt-2 rounded-sm">
            <div className="space-y-4">
                {forecast.map((day) => (
                    <div
                        key={day.date}
                        className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            {/*{getWeatherIcon(day.day.condition.text)}*/}
                            <img src={`https:${day.day.condition.icon}`} alt="icon"/>
                            <div>
                                <div className="text-white font-medium">
                                    {formatDate(day.date).split(',')[0]}
                                </div>
                                <div className="text-blue-200 text-sm">
                                    {formatDate(day.date).split(',')[1]}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-white text-sm capitalize">{day.day.condition.text}</div>
                            <div className="text-white font-semibold text-lg">
                                {day.day[`maxtemp_${localStorage.getItem("unit").toLowerCase()}`]}°°{localStorage.getItem("unit")} /   {day.day[`mintemp_${localStorage.getItem("unit").toLowerCase()}`]}°°{localStorage.getItem("unit")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
