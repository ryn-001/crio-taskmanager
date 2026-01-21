import Navbar from "./components/Navbar/Navbar.js";
import Hero from "./components/Hero/Hero.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import {Route,Routes} from "react-router"

export default function App(){

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Hero />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </div>
    )
} 