import { useState } from "react";

export function useWeatherByCity(city: string) {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch weather data based on city name
    const fetchWeatherByCity = async () => {
        const apiKey: string = import.meta.env.VITE_API_KEY;
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!response.ok) throw new Error("City not found or API error");
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { weatherData, loading, error, fetchWeatherByCity };
}
