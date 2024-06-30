import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle'; // Import the ThemeToggle component
import "../navbar/Navbar.css";
import Userinfo from '../userInfo/Userinfo';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const storedUser = localStorage.getItem('currentUser');

    if (token && expiresIn && storedUser) {
      const isExpired = Date.now() > parseInt(expiresIn, 10);
      if (isExpired) {
        handleLogout();
      } else {
        setCurrentUser(JSON.parse(storedUser));
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const signout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/signout');
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('expiresIn'); // Remove expiration time from localStorage
      localStorage.removeItem('currentUser'); // Remove current user from localStorage
      setCurrentUser(null); // Clear current user state
      navigate("/signin"); // Navigate to sign-in page
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  const handleLogout = async () => {
    await signout();
    navigate('/');
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  // Hide navbar on Sign In and Sign Up pages
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

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
              <li><Link to="/tripgroup"><i className="fas fa-route"></i> Trip Groups</Link></li>
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
            <ThemeToggle /> 
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
