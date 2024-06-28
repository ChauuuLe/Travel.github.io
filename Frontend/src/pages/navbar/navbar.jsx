import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Corrected import
import axios from 'axios';
import "../navbar/Navbar.css";

const Navbar = () => {
  const currentUser = window.gon ? window.gon.currentUser : null;
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const signout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/signout');
      localStorage.removeItem('token'); // Remove token from localStorage
      if (window.gon) {
        window.gon.currentUser = null; // Clear the current user information
      }
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  const handleLogout = async () => {
    await signout();
    navigate('/'); 
  };

  const renderAccountAction = () => {
    if (currentUser) {
      return (
        <React.Fragment>
          <button onClick={handleLogout}>Logout</button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/signin" className="signin"><i className="fas fa-sign-in-alt"></i> Sign In</Link>
          <Link to="/signup" className="signup"><i className="fas fa-user-plus"></i> Sign Up</Link>
        </React.Fragment>
      );
    }
  };

  return (
    <section className={`navBarSection ${scrollDirection === 'down' ? 'hidden' : ''}`}>
      <header className="header flex">
        <div className="navbar-container">
          <div className='logoDiv'>
            <Link to='/' className='logo flex'>
              <h1>The Travel.</h1>
            </Link>
          </div>
          <nav className="navBar">
            <ul className='navLists flex'>
              <li><Link to="/hotels"><i className="fas fa-hotel"></i> Hotels</Link></li>
              <li><Link to="/flight"><i className="fa-solid fa-plane"></i> Flight</Link></li>
              <li><Link to="/destinations"><i className="fas fa-map-marked-alt"></i> Destinations</Link></li>
              <li><a href="http://localhost:3000"><i className="fas fa-cloud-sun"></i> Weather</a></li>
              <li><Link to="/plan-your-trip"><i className="fas fa-route"></i> Plan Your Trip</Link></li>
            </ul>
          </nav>
          <div className="nav-actions">
            {renderAccountAction()}
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
