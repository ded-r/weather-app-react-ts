import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchWeather } from "../store/actions/actions";
import { useDispatch } from "react-redux";
import { WeatherActionTypes } from "../types/types";

export default function Nav() {
    const [city, setCity] = useState<string>("");
    const dispatch = useDispatch();

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city?.trim() == "") {
            alert("Please enter a city name.");
        } else {
            dispatch(fetchWeather(city) as unknown as WeatherActionTypes);
        }
    };
    return (
        <>
            <nav>
                <div className="flex justify-between">
                    <Link to="/" className="text-xl">
                        <b>Aua Raiy</b>
                    </Link>
                    <ul className="flex space-x-5 items-center">
                        <li>
                            <form onSubmit={handleFormSubmit}>
                                <input type="text" placeholder="Type city..." onChange={handleCityChange} className="border border-black rounded-lg px-3 py-1" />
                                <button type="submit" className="mx-2 cursor-pointer">
                                    🔎
                                </button>
                            </form>
                        </li>
                        <li>
                            <Link to="/">Basty Bet</Link>
                        </li>
                        <li>
                            <Link to="/about">Bız</Link>
                        </li>
                        <li>
                            <Link to="/contact">Kerı bailanys</Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Kıru <span>🔑</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reg">
                                Tırkelu <span>🔑</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
