import React from 'react';
import { Link } from 'react-router-dom';
//import './style.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="HomeLogo">
          <Link to="/">
            <img src="#" alt="HomePage" className="logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <ul>
            <li><Link to="#">Hotels</Link></li>
            <li><Link to="#">Transportations</Link></li>
            <li><Link to="#">Destinations</Link></li>
            <li><Link to="#">Weather</Link></li>
            <li><Link to="#">Plan Your Trip</Link></li>
          </ul>
        </nav>
        <div className="nav-actions">
          <Link to="/signin" className="signin">Sign In</Link>
          <Link to="/signup" className="signup">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
