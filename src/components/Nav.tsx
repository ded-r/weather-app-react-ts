import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faMagnifyingGlass, faUser, faUserPlus, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks/hooks";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../store/slices/weatherSlice";

export default function Nav() {
    const [city, setCity] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city.trim() === "") {
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
                    <ul className="space-x-5 items-center hidden md:flex lg:flex">
                        {location.pathname === "/" && (
                            <div className="flex space-x-4 justify-center items-center">
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

                    <div className="flex md:hidden lg:hidden" ref={dropdownRef}>
                        <button className="flex" type="button" onClick={toggleDropdown}>
                            {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                        </button>
                        {isOpen && (
                            <div className="origin-top-right z-10 absolute right-0 mt-5 w-28 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <ul className="px-4 py-2 text-sm">
                                        <li>
                                            <Link to="/" onClick={() => setIsOpen(false)}>
                                                Basty Bet
                                            </Link>
                                        </li>
                                        <hr />
                                        <li>
                                            <Link to="/about" onClick={() => setIsOpen(false)}>
                                                Bız
                                            </Link>
                                        </li>
                                        <hr />
                                        <li>
                                            <Link to="/contact" onClick={() => setIsOpen(false)}>
                                                Kerı bailanys
                                            </Link>
                                        </li>
                                        <hr />
                                        <li>
                                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                                Kıru <FontAwesomeIcon icon={faUser} />
                                            </Link>
                                        </li>
                                        <hr />
                                        <li>
                                            <Link to="/reg" onClick={() => setIsOpen(false)}>
                                                Tırkelu <FontAwesomeIcon icon={faUserPlus} />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
