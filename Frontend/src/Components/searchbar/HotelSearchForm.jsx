import React, { useState } from 'react';

function HotelSearchForm({ onSearch }) {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ destination, checkIn, checkOut, adults });
    };

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
                required
            />
            <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
            />
            <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                required
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default HotelSearchForm;
