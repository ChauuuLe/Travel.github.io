import React from 'react';
import { Link } from 'react-router-dom';
import "../navbar/Navbar.css";

const Navbar = () => {
  return (
    <section className='navBarSection'>
      <header className="header flex">
        <div className="navbar-container">
          <div className='logoDiv'>
            <a href='#' className='logo flex'>
              <h1>The Liems.</h1>
            </a>
          </div>
          <nav className="navBar">
            <ul className='navLists flex'>
              <li><Link to="/hotels"><i className="fas fa-hotel"></i> Hotels</Link></li>
              <li><Link to="/transportations"><i className="fas fa-bus"></i> Transportations</Link></li>
              <li><Link to="/destinations"><i className="fas fa-map-marked-alt"></i> Destinations</Link></li>
              <li><Link to="http://localhost:3000"><i className="fas fa-cloud-sun"></i> Weather</Link></li>
              <li><Link to="/plan-your-trip"><i className="fas fa-route"></i> Plan Your Trip</Link></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <Link to="/signin" className="signin"><i className="fas fa-sign-in-alt"></i> Sign In</Link>
            <Link to="/signup" className="signup"><i className="fas fa-user-plus"></i> Sign Up</Link>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;