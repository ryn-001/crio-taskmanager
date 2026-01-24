import { useState } from "react"; // Added this
import Navbar from "./components/Navbar/Navbar.js";
import Hero from "./components/Hero/Hero.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import ProtectedRoute from "./contexts/ProtectedRoute.js";
import PublicRoute from "./contexts/PublicRoute.js";
import { Route, Routes, Navigate } from "react-router";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} onNewTaskClick={handleOpenModal} />
      
      <Routes>
        <Route exact path="/" element={<Hero />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                modalOpen={modalOpen} 
                handleCloseModal={handleCloseModal} 
              />
            } 
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}