import './Hero.css';
import {useNavigate} from "react-router";

const Hero = ({ isLoggedIn }) => {

  const navigate = useNavigate();

  return (
    <header className="hero">
      <div className="hero-content">
        {isLoggedIn ? (
          <>
            <h1>Welcome Back, <span className="text-highlight">Achiever</span></h1>
            <p>You have 5 pending tasks for today. Stay focused and productive.</p>
            <div className="hero-btns">
              <button className="btn-primary">View Dashboard</button>
            </div>
          </>
        ) : (
          <>
            <h1>Manage Your Time, <br /><span className="text-highlight">Master Your Life</span></h1>
            <p>Login for adding your tasks and stay organized with our simple task manager.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate("/register")}>Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </>
        )}
      </div>
      <div className="hero-image">
        <div className="abstract-shape"></div>
      </div>
    </header>
  );
};

export default Hero;