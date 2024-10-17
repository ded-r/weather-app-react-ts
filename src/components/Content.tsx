import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { fetchWeatherByCoords } from "../store/actions/actions";
import { WeatherActionTypes } from "../types/types";

const Content: React.FC = () => {
    const dispatch = useDispatch();
    const weather = useSelector((state: RootState) => state.weather);
    const { loading, error, data } = weather;

    useEffect(() => {
        // Get user's geolocation on mount
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchWeatherByCoords(latitude, longitude) as unknown as WeatherActionTypes);
                },
                (error) => {
                    console.error("Error fetching geolocation", error);
                }
            );
        } else {
            console.error("Geolocation not supported by browser");
        }
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <div className="rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl text-center">
                    <b className="text-xl">Kute turynyz...</b>
                </div>
            ) : error ? (
                <div className="rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl">
                    <div className="flex flex-col items-start justify-end mx-auto border border-black rounded-lg w-1/2 h-48">
                        <b className="text-xl m-4">Kate ketty</b>
                    </div>
                </div>
            ) : data ? (
                <div>
                    <div className="flex rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl">
                        <div className="w-1/2 flex justify-end">
                            <div className="border border-black rounded-lg w-1/2 p-3 text-center">
                                <b>
                                    {data.city}, {data.country}
                                </b>
                                <div className="flex items-center justify-center">
                                    <p className="text-3xl">{Math.round(data.temperature)}°C</p>
                                    <img className="w-20 h-20" src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`} alt="weather-icon" />
                                </div>
                                <b className="text-xl">{data.main}</b>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div className="ml-5">
                            <p>Feels like: {Math.round(data.feelsLike)}°C</p>
                            <p>Wind: {data.wind} m/s</p>
                            <p>Humidity: {data.wind} %</p>
                            <p>Pressure: {data.pressure} Pa</p>
                            <p>Visibility: {data.visibility / 1000} km</p>
                        </div>
                    </div>
                    <div className="rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl">
                        <div>
                            <b>
                                {data.city}, {data.country} aua rayi bolzhamy
                            </b>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Content;
