export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export type WeatherActionTypes = { type: typeof FETCH_WEATHER_REQUEST } | { type: typeof FETCH_WEATHER_SUCCESS; payload: { city: string; temperature: number; description: string } } | { type: typeof FETCH_WEATHER_FAILURE; payload: string };

export interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    main: string;
    description: string;
    humidity: number;
    pressure: number;
    visibility: number;
    wind: number;
    icon: string;
}

export interface FetchWeatherRequest {
    type: typeof FETCH_WEATHER_REQUEST;
}
export interface FetchWeatherSuccess {
    type: typeof FETCH_WEATHER_SUCCESS;
    payload: WeatherData;
}
export interface FetchWeatherFailure {
    type: typeof FETCH_WEATHER_FAILURE;
    payload: string;
}

export type WeatherDispatchTypes = FetchWeatherRequest | FetchWeatherSuccess | FetchWeatherFailure;
