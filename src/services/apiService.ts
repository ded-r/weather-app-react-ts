// apiService.ts
const apiKey: string = import.meta.env.VITE_API_KEY;

export async function apiFetchCoors(latitude: number, longitude: number) {
    try {
        // Fetch current weather data
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        if (!currentWeatherResponse.ok) {
            throw new Error("Failed to fetch current weather data for the given coordinates");
        }
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch forecast data (5-day forecast with 3-hour intervals)
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        if (!forecastResponse.ok) {
            throw new Error("Failed to fetch forecast data for the given coordinates");
        }
        const forecastData = await forecastResponse.json();

        // Combine current weather and forecast data into a single object
        return {
            weather: currentWeatherData,
            forecast: forecastData,
        };
    } catch (error) {
        throw error; // Propagate the error for the calling function to handle
    }
}

export async function fetchWeatherByCity(city: string) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${city}`);
        }
        const data = await response.json();
        return data; // Return the fetched weather data
    } catch (error) {
        throw error; // Propagate the error for the calling function to handle
    }
}
