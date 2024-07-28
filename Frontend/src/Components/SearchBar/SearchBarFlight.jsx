import React, { useState } from 'react';
import { FaExchangeAlt, FaSearch, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';
import './SearchBarFlight.css';

const FlightSearchForm = ({ onSearch }) => {
  const today = new Date().toISOString().split('T')[0];
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [startDate, setStartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleReturnDateChange = (value) => {
    setReturnDate(value);
  };

  const handleSwapLocations = () => {
    const temporaryArrival = arrival;
    setArrival(departure);
    setDeparture(temporaryArrival);
  };

  const handleSearch = () => {
    if (new Date(departure) > new Date(arrival)) {
      setError('Arrival date must be after departure date.');
      return;
    }

    setError('');
    onSearch({ arrival, departure, startDate, returnDate });
  };

  return (
    <div className="flight-search-form">
      <h1>Find Cheap Flight Deals</h1>
      <div className="search-fields">
        <div className="single-segment">
          <div className="input-group">
            <label>Flying From</label>
            <FaPlaneDeparture className="input-icon" />
            <input
              type="text"
              placeholder="Airport Name"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
          <FaExchangeAlt className="exchange-icon" onClick={handleSwapLocations} />
          <div className="input-group">
            <label>Flying to</label>
            <FaPlaneArrival className="input-icon" />
            <input
              type="text"
              placeholder="AirportName"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Departure</label>
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => handleStartDateChange(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Return</label>
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              value={returnDate}
              min={today || startDate}
              onChange={(e) => handleReturnDateChange(e.target.value)}
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FlightSearchForm;
