import React, { useState } from 'react';
import { FaSearch, FaHotel, FaCalendarAlt, FaUser } from 'react-icons/fa';
import './HotelSearchForm.css';

const HotelSearchForm = ({ onSearch }) => {
  const today = new Date().toISOString().split('T')[0];
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [error, setError] = useState('');

  const handleCheckInChange = (value) => {
    setCheckIn(value);
    if (checkOut && new Date(value) > new Date(checkOut)) {
      setCheckOut(''); // Reset check-out date if it is before the check-in date
    }
  };

  const handleCheckOutChange = (value) => {
    if (new Date(value) < new Date(checkIn)) {
      setError('Check-out date must be after the check-in date.');
      setCheckOut(''); // Clear the check-out date to avoid confusion
    } else {
      setError('');
      setCheckOut(value);
    }
  };

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut || adults <= 0) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    onSearch({ destination, checkIn, checkOut, adults });
  };

  return (
    <div className="hotel-search-form">
      <h1>Search Your Hotel</h1>
      <div className="search-fields">
        <div className="single-segment">
          <div className="input-group">
            <label>Destination</label>
            <FaHotel className="input-icon" />
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Check-in</label>
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => handleCheckInChange(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Check-out</label>
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Adults</label>
            <FaUser className="input-icon" />
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              min="1"
              required
            />
          </div>
        </div>
      </div>
      <div className="search-buttons">
        <button className="search-button" onClick={handleSearch}>
          <FaSearch /> Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default HotelSearchForm;
