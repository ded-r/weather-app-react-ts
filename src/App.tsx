import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Content";
import About from "./pages/About";
import Contact from "./components/Contact";
import WrongPage from "./components/WrongPage";
import Layout from "./components/Layout";
import Reg from "./components/Reg";
import Login from "./components/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="*" element={<WrongPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reg" element={<Reg />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
