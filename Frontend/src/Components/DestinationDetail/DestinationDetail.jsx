import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/destinations/${destinationId}`);
        setDestination(response.data);
      } catch (error) {
        console.error(`Error fetching detailed destination`, error);
      }
    };
    fetchDestination();
  }, [destinationId]);

  if (!destination) return null;

  const handlePreviousClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="destination-detail">
      <div className="content-section">
        <div className="destination-info">
          <h1>{destination.name}</h1>
          <h2>{destination.country}</h2>
          <h2>{destination.city}</h2>
          <div className="line-separator"></div>
          <p>{destination.description}</p>
        </div>
        <div className="image-carousel">
          <button className="carousel-button left" onClick={handlePreviousClick}>&lt;</button>
          <div className="image-container">
            <img src={destination.images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
          </div>
          <button className="carousel-button right" onClick={handleNextClick}>&gt;</button>
          <div className="carousel-dots">
            {destination.images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <div className="activities-section">
          <h2>Activities</h2>
          <ul className="activities-list">
            {destination.activities.map(activity => (
              <li key={activity._id} className="activity-item">
                <div className="activity-image">
                  <img src={activity.image} alt={activity.name} />
                </div>
                <div className="activity-info">
                  <div>{activity.name}</div>
                  <div className="price">${activity.cost}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="average-cost">
        Average Cost: ${destination.averageCost}
      </div>
    </div>
  );
};

export default DestinationDetail;
