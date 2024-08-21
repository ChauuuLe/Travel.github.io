import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import "../navbar/Navbar.css";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/auth/signout`);
      localStorage.clear();
      setCurrentUser(null);
      navigate('/');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  const handleLogout = async () => {
    await signout();
  };

  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderAuthenticatedNavbar = () => (
    <ProfileMenu currentUser={currentUser} handleLogout={handleLogout} />
  );

  const renderUnauthenticatedNavbar = () => (
    <div className="nav-actions">
      <Link to="/signin" className="signin">
        <i className="fas fa-sign-in-alt"></i> Sign In
      </Link>
      <Link to="/signup" className="signup">
        <i className="fas fa-user-plus"></i> Sign Up
      </Link>
    </div>
  );

  return (
    <section className={`navBarSection ${scrollDirection === 'down' ? 'hidden' : ''}`}>
      <header className="header flex">
        <div className="navbar-container">
          <div className='logoDiv'>
            <a href='/'>
              <img src="/logo2.png"/>
            </a>
            <Link to='/' className='logo flex'>
              <h1>The Travel.</h1>
            </Link>
          </div>
          <nav className="navBar">
            <ul className='navLists flex'>
              <li><Link to="/hotels"><i className="fas fa-hotel"></i> Hotels</Link></li>
              <li><Link to="/flight"><i className="fas fa-plane"></i> Flight</Link></li>
              <li><Link to="/destinations"><i className="fas fa-map-marked-alt"></i> Destinations</Link></li>
              <li>
                <Link to={`${import.meta.env.VITE_WEATHER}`} target="_blank">
                  <i className="fas fa-cloud-sun"></i> Weather
                </Link>
              </li>
              <li className="dropdown">
                <a
                  onClick={toggleDropdown}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDropdown(); }}
                >
                  <i className="fas fa-route"></i> Plan Your Trip
                </a>
                {isOpen && (
                  <div className="dropdown-content">
                    <Link to="/tripgroup"><i className="fas fa-users"></i> Your Groups</Link>
                    <Link to="/creategroup"><i className="fas fa-plus-circle"></i> New Group</Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          <div className="nav-actions">
            {currentUser ? renderAuthenticatedNavbar() : renderUnauthenticatedNavbar()}
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;