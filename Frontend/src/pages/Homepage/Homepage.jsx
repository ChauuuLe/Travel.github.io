import React from 'react';
import Navbar from '../navbar/navbar'; // Adjust the path as necessary
import DestinationCard from '../../Components/destinationcard/destinationcard'; // Adjust the path as necessary
import Footer from '../footer/Footer'; // Adjust the path as necessary
import video from '../../assets/video.mp4'; // Replace with your video path
import danangImage from '../../assets/danang.jpg'; // Replace with your image path
import dalatImage from '../../assets/dalat.jpg'; // Replace with your image path
import hagiangImage from '../../assets/Hagiang.jpg'; // Replace with your image path
import './Homepage.css'; // Ensure this path points to the correct CSS file

const HomePage = () => {
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

  return (
    <div className="homepage">
      <Navbar className="navBarSection" />
      <div className="video-section">
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>
        <div className='homeContent'>
          <h1>Explore Your Next Adventure</h1>
          <p>Discover new places, cultures, and experiences around the world.</p>
        </div>
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
      <Footer />
    </div>
  );
};

export default HomePage;
