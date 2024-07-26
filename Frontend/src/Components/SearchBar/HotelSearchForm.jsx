import React, { useState } from 'react';

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

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        min={today}
        required
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        min={checkIn || today}
        required
      />
      <input
        type="number"
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
        min="1"
        required
      />
      <button type="submit">Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default HotelSearchForm;
