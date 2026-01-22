import { useState } from 'react';
import {useNavigate} from "react-router";
import './Navbar.css';

const Navbar = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <span className="logo-icon">Task</span>
        <span className="logo-text">Manager</span>
      </div>

      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <button className="btn-add-task">+ New Task</button>
              <button className="btn-outline">Logout</button>
            </>
          ) : (
            <>
              <button className="btn-outline" onClick={() => navigate("/login")}>Login</button>
              <button className="btn-add-task" onClick={() => navigate("/register")}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;