import React, { useState } from 'react';
import "./Homepage.css";
import Navbar from '../navbar/navbar';
import DestinationCard from '../../Components/destinationcard/destinationcard';
import Footer from '../footer/Footer';
import video from '../../assets/vidbg.mp4';
import danangImage from '../../assets/danang.jpg';
import dalatImage from '../../assets/dalat.jpg';
import hagiangImage from '../../assets/Hagiang.jpg';

const HomePage = () => {
  const [price, setPrice] = useState(5000);
  const [query, setQuery] = useState(''); 
  const destinations = [
    {
      image: danangImage,
      title: 'Đà Nẵng',
      description: "Discover Đà Nẵng: stunning beaches, vibrant nightlife, rich culture, and attractions like Marble Mountains and Dragon Bridge.",
      price: 700,
    },
    {
      image: dalatImage,
      title: 'Đà Lạt',
      description: "Nestled in the Central Highlands, Đà Lạt offers a cool climate, lush pine forests, and charming colonial architecture.",
      price: 600,
    },
    {
      image: hagiangImage,
      title: 'Hà Giang',
      description: 'Explore Hà Giang, a stunning highland region in northern Vietnam with limestone mountains, winding rivers, and terraced rice fields.',
      price: 750,
    },
  ];

  const filteredDestinations = destinations.filter(destination =>
    destination.title.toLowerCase().includes(query.toLowerCase()) ||
    destination.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="homepage">
      <Navbar />
      <div className="video-section">
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>
        <div className='homeContent'>
          {/* Additional content can go here */}
        </div>
      </div>
      <div className="searchBar">
        <div className="searchBarRow">
          <div className="inputField">
            <label>Search your destination:</label>
            <input
              type="text"
              placeholder="Enter name here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update search query state
            />
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
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination, index) => (
              <DestinationCard
                key={index}
                image={destination.image}
                title={destination.title}
                description={destination.description}
                price={destination.price}
              />
            ))
          ) : (
            <p>No destinations found.</p> 
          )}
        </div>
      </div>
      <div className="more-content">
        <h2>More Travel Ideas</h2>
        <p>Explore more travel ideas and tips to make your journey unforgettable.</p>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
