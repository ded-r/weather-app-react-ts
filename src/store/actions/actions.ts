import { Dispatch } from "redux";
import { WeatherActionTypes, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, FETCH_WEATHER_REQUEST, WeatherData } from "../../types/types";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const constructWeatherPayload = (data: any): WeatherData => ({
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    main: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: data.visibility,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
});

// Fetch weather by city (for reference)
export const fetchWeather = (city: string) => {
    return async (dispatch: Dispatch<WeatherActionTypes>) => {
        dispatch({ type: FETCH_WEATHER_REQUEST });

        try {
            const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }

            const data = await response.json();

            dispatch({
                type: FETCH_WEATHER_SUCCESS,
                payload: constructWeatherPayload(data),
            });
        } catch (error: any) {
            dispatch({
                type: FETCH_WEATHER_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Fetch weather by geolocation (latitude and longitude)
export const fetchWeatherByCoords = (latitude: number, longitude: number) => {
    return async (dispatch: Dispatch<WeatherActionTypes>) => {
        dispatch({ type: FETCH_WEATHER_REQUEST });

        try {
            const response = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }

            const data = await response.json();

            dispatch({
                type: FETCH_WEATHER_SUCCESS,
                payload: constructWeatherPayload(data),
            });
        } catch (error: any) {
            dispatch({
                type: FETCH_WEATHER_FAILURE,
                payload: error.message,
            });
        }
    };
};
