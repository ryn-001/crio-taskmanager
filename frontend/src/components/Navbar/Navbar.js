import { useState } from 'react';
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UserContext";
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <span className="logo-icon">Task</span>
        <span className="logo-text">Manager</span>
      </div>

      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <div className="navbar-actions">
          {user ? (
            <>
              <div className="user-profile">
                <div className="avatar">
                  {user.username ? user.username[0].toUpperCase() : 'U'}
                </div>
                <span className="user-name">{user.username}</span>
              </div>
              <button className="btn-add-task" onClick={() => navigate("/create-task")}>
                + New Task
              </button>
              <button className="btn-outline" onClick={handleLogout}>
                Logout
              </button>
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