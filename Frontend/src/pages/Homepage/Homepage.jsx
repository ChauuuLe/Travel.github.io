  // Homepage.js
  import React from 'react';
  import Navbar from '../navbar/navbar';
  import Footer from '../footer/Footer';
  import './Homepage.css';

  const Homepage = () => {
    return (
      <div className="homepage">
        <main className="main-content">
          <section className="hero-section">
            <h1>Welcome to The Travel</h1>
            <p>Discover the best destinations around the world.</p>
            <button className="cta-button">Explore Now</button>
          </section>
          <section className="featured-destinations">
            <h2>Featured Destinations</h2>
            <div className="destinations-grid">
              <div className="destination-card">
                <img src="image-url-1" alt="Destination 1" />
                <h3>Destination 1</h3>
                <p>Description of Destination 1.</p>
              </div>
              <div className="destination-card">
                <img src="image-url-2" alt="Destination 2" />
                <h3>Destination 2</h3>
                <p>Description of Destination 2.</p>
              </div>
              {/* Add more destination cards as needed */}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  };

  export default Homepage;
