import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../navbar/Navbar.css";

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

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
            <Link to="/signin" className="signin"><i className="fas fa-sign-in-alt"></i> Sign In</Link>
            <Link to="/signup" className="signup"><i className="fas fa-user-plus"></i> Sign Up</Link>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
