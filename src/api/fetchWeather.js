export const fetchWeather = async (city, days) => {
    console.log(city,days);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}?key=${import.meta.env.VITE_API_KEY}&q=${city}&days=${days}`);
    console.log(res)
    if (!res.ok) throw new Error('City not found');
    return await res.json();
};