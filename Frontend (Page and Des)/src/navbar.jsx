import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="HomeLogo">
          <Link to="/">
            <img src="/path/to/logo.png" alt="HomePage" className="logo" /> {/* Update with your logo path */}
          </Link>
        </div>
        <nav className="nav-links">
          <ul>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/transportations">Transportations</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="http://localhost:3000">Weather</Link></li>
            <li><Link to="/plan-your-trip">Plan Your Trip</Link></li>
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
