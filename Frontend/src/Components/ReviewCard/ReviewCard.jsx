import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ hotelName, location, review, reviewer }) => {
  return (
    <div className="review-card">
      <h3 className="hotel-name">{hotelName}</h3>
      <p className="location">{location}</p>
      <p className="review-text">{`"${review}"`}</p>
      <p className="reviewer">- {reviewer}</p>
    </div>
  );
};

export default ReviewCard;
