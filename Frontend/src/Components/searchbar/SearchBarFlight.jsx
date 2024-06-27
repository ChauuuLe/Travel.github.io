import React, { useState } from 'react';
import { FaExchangeAlt, FaUser, FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
//import './FlightSearchForm.css';

const FlightSearchForm = () => {
    const [tripType, setTripType] = useState('round-trip');
    const [segments, setSegments] = useState([{ id: 1, from: '', to: '', date: '' }]);
    const [passengers, setPassengers] = useState(1);
    const [classType, setClassType] = useState('Economy');

    const handleAddSegment = () => {
        setSegments([...segments, { id: segments.length + 1, from: '', to: '', date: '' }]);
    };

    const handleRemoveSegment = (id) => {
        setSegments(segments.filter(segment => segment.id !== id));
    };

    const handleSegmentChange = (id, field, value) => {
        setSegments(segments.map(segment => segment.id === id ? { ...segment, [field]: value } : segment));
    };

    const handleSearch = () => {
        // Implement search logic here
    };

    return (
        <div className="flight-search-form">
            <h1>Find Cheap Flight Deals</h1>
            <div className="trip-type">
                <label>
                    <input
                        type="radio"
                        name="tripType"
                        value="round-trip"
                        checked={tripType === 'round-trip'}
                        onChange={() => setTripType('round-trip')}
                    />
                    Round-trip
                </label>
                <label>
                    <input
                        type="radio"
                        name="tripType"
                        value="one-way"
                        checked={tripType === 'one-way'}
                        onChange={() => setTripType('one-way')}
                    />
                    One-way
                </label>
                <label>
                    <input
                        type="radio"
                        name="tripType"
                        value="multi-city"
                        checked={tripType === 'multi-city'}
                        onChange={() => setTripType('multi-city')}
                    />
                    Multi-city
                </label>
            </div>
            <div className="search-fields">
                {tripType === 'multi-city' ? (
                    <>
                        {segments.map((segment, index) => (
                            <div key={segment.id} className="segment">
                                <div className="segment-fields">
                                    <input
                                        type="text"
                                        placeholder="Leaving from"
                                        value={segment.from}
                                        onChange={(e) => handleSegmentChange(segment.id, 'from', e.target.value)}
                                    />
                                    <FaExchangeAlt className="exchange-icon" />
                                    <input
                                        type="text"
                                        placeholder="Going to"
                                        value={segment.to}
                                        onChange={(e) => handleSegmentChange(segment.id, 'to', e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={segment.date}
                                        onChange={(e) => handleSegmentChange(segment.id, 'date', e.target.value)}
                                    />
                                </div>
                                {segments.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-segment"
                                        onClick={() => handleRemoveSegment(segment.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="add-segment" onClick={handleAddSegment}>
                            <FaPlus /> Add another flight
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Leaving from"
                            value={segments[0].from}
                            onChange={(e) => handleSegmentChange(1, 'from', e.target.value)}
                        />
                        <FaExchangeAlt className="exchange-icon" />
                        <input
                            type="text"
                            placeholder="Going to"
                            value={segments[0].to}
                            onChange={(e) => handleSegmentChange(1, 'to', e.target.value)}
                        />
                        <input
                            type="date"
                            value={segments[0].date}
                            onChange={(e) => handleSegmentChange(1, 'date', e.target.value)}
                        />
                        {tripType === 'round-trip' && (
                            <input
                                type="date"
                                value={segments[1] ? segments[1].date : ''}
                                onChange={(e) => handleSegmentChange(2, 'date', e.target.value)}
                            />
                        )}
                    </>
                )}
                <div className="passenger-class">
                    <FaUser />
                    <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1} Adult{num > 0 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                    <select
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                    >
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First Class">First Class</option>
                    </select>
                </div>
            </div>
            <div className="search-buttons">
                <button className="search-button">Flight + Hotel</button>
                <button className="search-button">
                    <FaSearch /> Search
                </button>
            </div>
        </div>
    );
};

export default FlightSearchForm;
