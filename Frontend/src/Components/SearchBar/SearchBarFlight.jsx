import React, { useState } from 'react';
import { FaExchangeAlt, FaUser, FaSearch, FaPlus, FaTrash, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';
import './SearchBarFlight.css';
import flightsData from '../../assets/flightsData/flightsData.json';

const FlightSearchForm = ({ onSearch }) => {
    const [tripType, setTripType] = useState('round-trip');
    const [segments, setSegments] = useState([{ id: 1, from: '', to: '', date: '' }]);
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [classType, setClassType] = useState('Economy');
    const [nonstop, setNonstop] = useState(false);

    const todayDate = new Date().toISOString().split('T')[0];

    const handleAddSegment = () => {
        setSegments([...segments, { id: segments.length + 1, from: '', to: '', date: '' }]);
    };

    const handleRemoveSegment = (id) => {
        setSegments(segments.filter(segment => segment.id !== id));
    };

    const handleSegmentChange = (id, field, value) => {
        setSegments(segments.map(segment => segment.id === id ? { ...segment, [field]: value } : segment));
    };

    const handleDepartureDateChange = (id, value) => {
        handleSegmentChange(id, 'date', value);
        if (id === 1) {
            setReturnDate(''); // Reset return date if departure date changes
        }
    };

    const handleReturnDateChange = (value) => {
        setReturnDate(value);
    };

    const handleSearch = () => {
        const firstSegment = segments[0];
        if (!firstSegment.from || !firstSegment.to) {
            alert("Please enter both 'Leaving from' and 'Going to' locations.");
            return;
        }

        if (!firstSegment.date) {
            alert("Please select a departure date.");
            return;
        }

        if (tripType === 'round-trip' && !returnDate) {
            alert("Please select a return date.");
            return;
        }

        let results;
        if (tripType === 'round-trip') {
            const outboundFlights = flightsData.filter(flight =>
                flight.from.toLowerCase() === firstSegment.from.toLowerCase() &&
                flight.to.toLowerCase() === firstSegment.to.toLowerCase() &&
                flight.date === firstSegment.date
            );

            const returnFlights = flightsData.filter(flight =>
                flight.from.toLowerCase() === firstSegment.to.toLowerCase() &&
                flight.to.toLowerCase() === firstSegment.from.toLowerCase() &&
                flight.date === returnDate
            );

            results = outboundFlights.map(outbound => {
                return returnFlights.map(returnFlight => {
                    return {
                        ...outbound,
                        returnFlight,
                        totalPrice: parseFloat(outbound.price.replace(/[^\d]/g, '')) + parseFloat(returnFlight.price.replace(/[^\d]/g, ''))
                    };
                });
            }).flat();
        } else {
            results = flightsData.filter(flight =>
                flight.from.toLowerCase() === firstSegment.from.toLowerCase() &&
                flight.to.toLowerCase() === firstSegment.to.toLowerCase() &&
                flight.date === firstSegment.date
            );
        }

        if (results.length === 0) {
            onSearch('No flights found');
        } else {
            onSearch(results);
        }
    };

    const handleSwapLocations = () => {
        const [firstSegment] = segments;
        if (firstSegment) {
            setSegments([{ ...firstSegment, from: firstSegment.to, to: firstSegment.from }]);
        }
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
                <label className="nonstop">
                    <input
                        type="checkbox"
                        checked={nonstop}
                        onChange={() => setNonstop(!nonstop)}
                    />
                    Nonstop only
                </label>
            </div>
            <div className="search-fields">
                {tripType === 'multi-city' ? (
                    <>
                        {segments.map((segment, index) => (
                            <div key={segment.id} className="segment">
                                <div className="segment-number">{index + 1}</div>
                                <div className="segment-fields">
                                    <div className="input-group">
                                        <FaPlaneDeparture className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Leaving from"
                                            value={segment.from}
                                            onChange={(e) => handleSegmentChange(segment.id, 'from', e.target.value)}
                                        />
                                    </div>
                                    <FaExchangeAlt className="exchange-icon" onClick={handleSwapLocations} />
                                    <div className="input-group">
                                        <FaPlaneArrival className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Going to"
                                            value={segment.to}
                                            onChange={(e) => handleSegmentChange(segment.id, 'to', e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <FaCalendarAlt className="input-icon" />
                                        <input
                                            type="date"
                                            min={todayDate}
                                            value={segment.date}
                                            onChange={(e) => handleSegmentChange(segment.id, 'date', e.target.value)}
                                        />
                                    </div>
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
                        <div className="single-segment">
                            <div className="input-group">
                                <FaPlaneDeparture className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Leaving from"
                                    value={segments[0].from}
                                    onChange={(e) => handleSegmentChange(1, 'from', e.target.value)}
                                />
                            </div>
                            <FaExchangeAlt className="exchange-icon" onClick={handleSwapLocations} />
                            <div className="input-group">
                                <FaPlaneArrival className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Going to"
                                    value={segments[0].to}
                                    onChange={(e) => handleSegmentChange(1, 'to', e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <FaCalendarAlt className="input-icon" />
                                <input
                                    type="date"
                                    min={todayDate}
                                    value={segments[0].date}
                                    onChange={(e) => handleDepartureDateChange(1, e.target.value)}
                                />
                            </div>
                            {tripType === 'round-trip' && (
                                <div className="input-group">
                                    <FaCalendarAlt className="input-icon" />
                                    <input
                                        type="date"
                                        min={segments[0].date || todayDate}
                                        value={returnDate}
                                        onChange={(e) => handleReturnDateChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
                <div className="passenger-class">
                    <div className="input-group">
                        <FaUser className="input-icon" />
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
                    </div>
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
                <button className="search-button" onClick={handleSearch}>
                    <FaSearch /> Search
                </button>
            </div>
        </div>
    );
};

export default FlightSearchForm;
