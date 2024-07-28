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
    if (returnDate && new Date(value) > new Date(returnDate)) {
      setReturnDate(''); // Reset return date if it is before the departure date
    }
  };

  const handleReturnDateChange = (value) => {
    if (new Date(value) < new Date(startDate)) {
      setError('Return date must be after the departure date.');
      setReturnDate(''); // Clear the return date to avoid confusion
    } else {
      setError('');
      setReturnDate(value);
    }
  };

  const handleSwapLocations = () => {
    const temporaryArrival = arrival;
    setArrival(departure);
    setDeparture(temporaryArrival);
  };

  const handleSearch = () => {
    if (!arrival || !departure || !startDate || !returnDate) {
      setError('Please fill in all fields.');
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
              placeholder="Airport ID (Ex: PEK)"
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
              placeholder="Airport ID (Ex: AUS)"
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
              min={startDate || today}
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
