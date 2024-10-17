import { useEffect, useState } from "react";
import { apiFetchCoors } from "../services/apiService";

export function useWeatherByGeolocation() {
    const [weather, setWeather] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch weather data based on latitude and longitude
    const fetchWeatherByCoords = async (latitude: number, longitude: number) => {
        setLoading(true);
        try {
            const { weather, forecast } = await apiFetchCoors(latitude, longitude); // Use the service function
            setWeather(weather);
            setForecast(forecast);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Fetch geolocation-based weather data
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                    console.log(latitude, longitude);
                },
                () => setError("Unable to retrieve your location")
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    return { weather, forecast, loading, error };
}
