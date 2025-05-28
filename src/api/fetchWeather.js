export const fetchWeather = async (city, days) => {
    console.log(city,days);
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d2ebddc6bc4448a885f130146252605&q=${city}&days=${days}`);
    console.log(res.json)
    if (!res.ok) throw new Error('City not found');
    return await res.json();
};