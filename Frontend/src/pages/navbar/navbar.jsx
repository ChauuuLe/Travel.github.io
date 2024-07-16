import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle';
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
      navigate("/signin");
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  const handleLogout = async () => {
    console.log(import.meta.env.VITE_BACKEND);
    await signout();
    navigate('/');
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
    <div className="auth-links">
      <Link to="/signin" className="signin"><i className="fas fa-sign-in-alt"></i> Sign In</Link>
      <Link to="/signup" className="signup"><i className="fas fa-user-plus"></i> Sign Up</Link>
    </div>
  );

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
              <li>
                <a
                  onClick={toggleDropdown}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDropdown(); }}
                >
                  <i className="fas fa-route"></i> Plan Your Trip
                </a>
                {isOpen && (
                  <div className="dropdown-content show">
                    <Link to="/tripgroup">Your Groups</Link>
                    <Link to="/creategroup">New group</Link>
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
