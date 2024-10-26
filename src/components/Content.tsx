import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchWeatherByCoords } from "../store/slices/weatherSlice";

const Content: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.weather.loading);
    const error = useAppSelector((state) => state.weather.error);
    const data = useAppSelector((state) => state.weather.data);

    useEffect(() => {
        if (!data) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        dispatch(fetchWeatherByCoords({ latitude, longitude }));
                        console.log(data);
                    },
                    (error) => {
                        console.error("Error fetching geolocation", error);
                    }
                );
            } else {
                console.error("Geolocation not supported by browser");
            }
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
                            <div className="border border-black rounded-lg md:w-1/2 lg:w-1/2 p-3 text-center">
                                <b>
                                    {data.name}, {data.sys.country}
                                </b>
                                <div className="flex items-center justify-center">
                                    <p className="text-xl md:text-2xl lg:text-3xl">{Math.round(data.main.temp)}°C</p>
                                    <img className="w-10 h-10 md:w-15 md:h-15 lg:w-20 lg:h-20" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="weather-icon" />
                                </div>
                                <b className="text-xl">{data.weather[0].main}</b>
                                <p>{data.weather[0].description}</p>
                            </div>
                        </div>
                        <div className="ml-5">
                            <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
                            <p>Wind: {data.wind.speed} m/s</p>
                            <p>Humidity: {data.main.humidity} %</p>
                            <p>Pressure: {data.main.pressure} Pa</p>
                            <p>Visibility: {data.visibility / 1000} km</p>
                        </div>
                    </div>
                    <div className="rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl">
                        <div>
                            <b>
                                {data.name}, {data.country} aua rayi bolzhamy
                            </b>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl text-center">
                    <b className="text-xl m-4">Aua Rayi</b>
                </div>
            )}
        </>
    );
};

export default Content;
