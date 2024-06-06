import React, { useState } from 'react';
import "../Homepage/Homepage.css";
import Navbar from '../navbar/navbar';
import DestinationCard from '../destinationcard/destinationcard';
import video from '../../../../Backend (server and db)/app/assets/images/video.mp4';

const HomePage = () => {
  const [price, setPrice] = useState(5000);

  const destinations = [
    {
      image: 'https://example.com/bora-bora.jpg',
      title: 'Bora Bora',
      description: 'Experience the ultimate tropical paradise.',
      price: 700,
    },
    {
      image: 'https://example.com/machu-picchu.jpg',
      title: 'Machu Picchu',
      description: 'Explore the ancient Inca ruins.',
      price: 600,
    },
    {
      image: 'https://example.com/great-barrier-reef.jpg',
      title: 'Great Barrier Reef',
      description: 'Dive into the world’s largest coral reef system.',
      price: 750,
    },
  ];

  return (
    <div className="homepage">
      <Navbar />
      <div className="video-section">
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>
        <div className='homeContent'>
          <div className='textDiv'>
            <span className='smallText'>Our Packages</span>
            <h1 className='homeTitle'>Search your Holiday</h1>
          </div>
        </div>
      </div>
      <div className="searchBar">
        <div className="searchBarRow">
          <div className="inputField">
            <label>Search your destination:</label>
            <input type="text" placeholder="Enter name here..." />
          </div>
          <div className="inputField">
            <label>Select your date:</label>
            <input type="date" />
          </div>
          <div className="priceRange">
            <label>Max price:</label>
            <div className="range-container">
              <span>${price}</span>
              <input
                type="range"
                min="0"
                max="10000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button><i className="fas fa-filter"></i> More Filters</button>
      </div>
      <div className="icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-tripadvisor"></i></a>
      </div>
      <div className="destinations">
        <h2>Most visited destinations</h2>
        <div className="destination-cards">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              image={destination.image}
              title={destination.title}
              description={destination.description}
              price={destination.price}
            />
          ))}
        </div>
      </div>
      <div className="more-content">
        <h2>More Travel Ideas</h2>
        <p>Explore more travel ideas and tips to make your journey unforgettable.</p>
        {/* Add more content or sections as needed */}
      </div>
    </div>
  );
};

export default HomePage;
