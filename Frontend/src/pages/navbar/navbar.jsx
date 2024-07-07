import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle'; // Import the ThemeToggle component
import "../navbar/Navbar.css";
import Userinfo from '../userInfo/Userinfo';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const currentUser = window.gon ? window.gon.currentUser : null; // Ensure window.gon exists
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const storedUser = localStorage.getItem('currentUser');

    if (token && expiresIn && storedUser) {
      const isExpired = Date.now() > parseInt(expiresIn, 10);
      if (isExpired) {
        handleLogout();
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setCurrentUser(JSON.parse(storedUser));
        setScrollDirection('up');
      }
    } else {
      handleLogout();
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    setLastScrollY(window.scrollY);
  };
      setLastScrollY(window.scrollY);
    };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const signout = async () => {
    try {
      await axios.post('https://travel-github-io.onrender.com/api/auth/logout);
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('expiresIn'); // Remove expiration time from localStorage
      localStorage.removeItem('currentUser'); // Remove current user from localStorage
      setCurrentUser(null); // Clear current user state
      navigate("/signin"); // Navigate to sign-in page
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
    //window.location.reload();
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
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

  // Hide navbar on Sign In and Sign Up pages
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
          <ThemeToggle />
          <nav className="navBar">
            <ul className='navLists flex'>
              <li><Link to="/hotels"><i className="fas fa-hotel"></i> Hotels</Link></li>
              <li><Link to="/flight"><i className="fa-solid fa-plane"></i> Flight</Link></li>
              <li><Link to="/destinations"><i className="fas fa-map-marked-alt"></i> Destinations</Link></li>
              <li><a href="http://localhost:3000"><i className="fas fa-cloud-sun"></i> Weather</a></li>
              <li><button onClick={toggleDropdown}> Plan your trips</button></li>
              {isOpen && (
                <div>
                  <Link to="/tripgroup"><i className="fas fa-route"></i> Your Groups</Link>
                  <Link to="#">New group</Link>
                </div>
              )}
              <li><Link to="/plan-your-trip"><i className="fas fa-route"></i> Plan Your Trip</Link></li>
            </ul>
          </nav>
          <div
            className="nav-actions"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {currentUser ? (
              <div className="dropdown">
                <Userinfo />
                {isDropdownVisible && (
                  <div className="dropdown-content">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="signin"><i className="fas fa-sign-in-alt"></i> Sign In</Link>
                <Link to="/signup" className="signup"><i className="fas fa-user-plus"></i> Sign Up</Link>
              </>
            )}
          <div className="nav-actions">
            <ThemeToggle /> {}
            {renderAccountAction()}
          </div>
        </div>
      </header>
    </section>
  );
};
export default Navbar;
