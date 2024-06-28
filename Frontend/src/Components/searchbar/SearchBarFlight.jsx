import React, { useState } from 'react';
import { FaExchangeAlt, FaUser, FaSearch, FaPlus, FaTrash, FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';
import './SearchBarFlight.css';

const FlightSearchForm = () => {
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
        const searchUrl = generateBookingSearchUrl({
            fromLocation: segments[0].from,
            toLocation: segments[0].to,
            departureDate: segments[0].date,
            returnDate: returnDate,
            tripType: tripType,
            passengers: passengers,
            classType: classType,
            nonstop: nonstop
        });

        window.location.href = searchUrl;
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
                <button className="search-button hotel-button">Flight + Hotel</button>
                <button className="search-button" onClick={handleSearch}>
                    <FaSearch /> Search
                </button>
            </div>
        </div>
    );
};

const generateBookingSearchUrl = ({ fromLocation, toLocation, departureDate, returnDate = '', tripType = 'round-trip', passengers = 1, classType = 'Economy', nonstop = false }) => {
    const baseUrl = "https://www.booking.com/searchresults.html";
    const params = new URLSearchParams({
        ss: toLocation,
        checkin_year_month_monthday: departureDate.split('-').join('-'),
        checkout_year_month_monthday: tripType === 'round-trip' ? returnDate.split('-').join('-') : '',
        group_adults: passengers,
        no_rooms: 1, // Assuming one room for simplicity
        travel_purpose: 'leisure'
    });

    return `${baseUrl}?${params.toString()}`;
};

export default FlightSearchForm;
