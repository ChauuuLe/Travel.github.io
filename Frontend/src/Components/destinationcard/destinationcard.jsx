import React from 'react';
import './destinationcard.css';

const DestinationCard = ({ image, title, description, price }) => {
    return (
        <div className="destination-card">
            <img src={image} alt={title} className="destination-image" />
            <h2 className="destination-title">{title}</h2>
            <p className="destination-description">{description}</p>
            <p className="destination-price">From ${price}</p>
            <button className="book-now">Book Now</button>
        </div>
    );
};

export default DestinationCard;
