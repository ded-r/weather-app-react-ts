import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks/hooks";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../store/slices/weatherSlice";

export default function Nav() {
    const [city, setCity] = useState<string>("");
    const dispatch = useAppDispatch();

    const location = useLocation();

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city?.trim() == "") {
            alert("Please enter a city name.");
        } else {
            dispatch(fetchWeatherByCity(city));
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchWeatherByCoords({ latitude, longitude }));
                },
                (error) => {
                    console.error("Error fetching geolocation", error);
                }
            );
        } else {
            console.error("Geolocation not supported by browser");
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
                        {location.pathname === "/" && (
                            <div className="flex space-x-4">
                                <li>
                                    <div className="relative">
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="relative">
                                                <input type="text" placeholder="Type city..." onChange={handleCityChange} className="border border-black rounded-lg px-3 pl-10" />
                                                <button type="submit">
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                <li className="cursor-pointer">
                                    <FontAwesomeIcon icon={faLocationArrow} onClick={handleLocationClick} />
                                </li>
                            </div>
                        )}

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
                                Kıru <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </li>
                        <li>
                            <Link to="/reg">
                                Tırkelu <FontAwesomeIcon icon={faUserPlus} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
