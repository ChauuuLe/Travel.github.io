import React from 'react';
import './HotelResult.css'; // Assuming you have a CSS file for styling

const HotelResults = ({ hotels }) => {
  return (
    <div className="HotelResults">
      {hotels.length === 0 ? (
        <p>Find hotel for your trip</p>
      ) : (
        hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <img 
              src={hotel.images?.[0]?.thumbnail || 'default-image-url.jpg'} 
              alt={hotel.name || 'Hotel Image'} 
              className="hotel-image" 
            />
            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              {hotel.overall_rating && (
                <p><strong>Overall Rating:</strong> {hotel.overall_rating}</p>
              )}
              {hotel.location_rating && (
                <p><strong>Location Rating:</strong> {hotel.location_rating}</p>
              )}
              {hotel.check_in_time && (
                <p><strong>Check-in:</strong> {hotel.check_in_time}</p>
              )}
              {hotel.check_out_time && (
                <p><strong>Check-out:</strong> {hotel.check_out_time}</p>
              )}
              {hotel.rate_per_night?.lowest && (
                <p>
                  <strong>Price per night:</strong> {hotel.rate_per_night.lowest}
                  {hotel.rate_per_night.before_taxes_fees && (
                    <span> (before taxes and fees: {hotel.rate_per_night.before_taxes_fees})</span>
                  )}
                </p>
              )}
              {hotel.total_rate?.lowest && (
                <p>
                  <strong>Total Rate:</strong> {hotel.total_rate.lowest}
                  {hotel.total_rate.before_taxes_fees && (
                    <span> (before taxes and fees: {hotel.total_rate.before_taxes_fees})</span>
                  )}
                </p>
              )}
              {hotel.link && (
                <a href={hotel.link} target="_blank" rel="noopener noreferrer" className="hotel-link">Visit Website</a>
              )}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="hotel-amenities">
                  <p><strong>Amenities:</strong></p>
                  <ul>
                    {hotel.amenities.map((amenity, i) => <li key={i}>{amenity}</li>)}
                  </ul>
                </div>
              )}
              {hotel.excluded_amenities && hotel.excluded_amenities.length > 0 && (
                <div className="hotel-excluded-amenities">
                  <p><strong>Excluded Amenities:</strong></p>
                  <ul>
                    {hotel.excluded_amenities.map((amenity, i) => <li key={i}>{amenity}</li>)}
                  </ul>
                </div>
              )}
              {hotel.essential_info && hotel.essential_info.length > 0 && (
                <div className="hotel-essential-info">
                  <p><strong>Essential Info:</strong></p>
                  <ul>
                    {hotel.essential_info.map((info, i) => <li key={i}>{info}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelResults;
