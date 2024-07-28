import React, { useState } from 'react';
import './HotelSearchForm.css';

function HotelSearchForm({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    setError('');
    onSearch({ destination, checkIn, checkOut, adults });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="hotel-search-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="destination">
            <i className="fas fa-map-marker-alt"></i> Destination
          </label>
          <input
            type="text"
            id="destination"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkIn">
            <i className="fas fa-calendar-alt"></i> Start Date
          </label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={today}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOut">
            <i className="fas fa-calendar-alt"></i> End Date
          </label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || today}  // Ensure min date for checkout is after checkIn
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adults">
            <i className="fas fa-user"></i> Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min="1"
            required
          />
        </div>
      </div>
      <div className="form-group-button">
        <button type="submit">
          <i className="fas fa-search"></i> Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default HotelSearchForm;
