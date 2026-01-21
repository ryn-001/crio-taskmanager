import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
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
              <button className="btn-outline">Login</button>
              <button className="btn-add-task">Sign Up</button>
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