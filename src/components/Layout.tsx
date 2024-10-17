import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
    return (
        <div>
            <div className="rounded-xl mt-9 mx-9 p-5 bg-white shadow-2xl">
                <Nav />
            </div>
            <Outlet />
        </div>
    );
}
