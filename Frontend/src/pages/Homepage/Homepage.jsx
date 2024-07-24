import React, { useState, useEffect } from 'react';
import "./Homepage.css";
import Navbar from '../navbar/navbar';
import DestinationCard from '../../Components/destinationcard/destinationcard';
import Footer from '../footer/Footer';
import video from '../../assets/video.mp4';
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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component is mounted
  }, []);

  return (
    <div className="homepage">
      <div className="video-section">
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>
        <div className='homeContent'>
        </div>
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
