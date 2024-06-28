import React, { useState } from 'react';
import './SearchBarFlight.css';
import { FaSearch, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { Datepicker } from '@mobiscroll/react';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const SearchBarFlight = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [dateRange, setDateRange] = useState([]);
    const [tripType, setTripType] = useState('round-trip');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = () => {
        if (!from || !to) {
            alert("Please enter both 'Leaving from' and 'Going to' locations.");
            return;
        }

        if (dateRange.length < 2) {
            alert("Please select a departure and return date.");
            return;
        }

        const [departureDate, returnDate] = dateRange;
        const searchUrl = generateBookingSearchUrl({
            fromLocation: from,
            toLocation: to,
            departureDate: departureDate ? departureDate.toISOString().split('T')[0] : '',
            returnDate: returnDate ? returnDate.toISOString().split('T')[0] : '',
            tripType: tripType,
            adults: adults,
            children: children
        });

        window.open(searchUrl, '_blank');
    };

    const generateBookingSearchUrl = ({ fromLocation, toLocation, departureDate, returnDate = '', tripType = 'round-trip', adults = 1, children = 0 }) => {
        const baseUrl = "https://www.kiwi.com/en/search/results";
        const params = new URLSearchParams({
            a: adults,
            c: children,
            d: fromLocation,
            da: departureDate,
            r: tripType === 'round-trip' ? toLocation : '',
            rd: tripType === 'round-trip' ? returnDate : '',
            t: tripType === 'round-trip' ? 'roundtrip' : 'oneway'
        });

        return `${baseUrl}?${params.toString()}`;
    };

    const handleDoneClick = () => {
        setShowDropdown(false);
    };

    const preventDropdownClose = (e) => {
        e.preventDefault();
    };

    return (
        <div className="search-bar">
            <div className="input-group">
                <FaPlaneDeparture />
                <input
                    type="text"
                    placeholder="Leaving from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    aria-label="Search for a departure location"
                />
            </div>
            <div className="input-group">
                <FaPlaneArrival />
                <input
                    type="text"
                    placeholder="Going to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    aria-label="Search for a destination location"
                />
            </div>
            <div className="date-group">
                <Datepicker
                    controls={['calendar']}
                    select="range"
                    calendarType="month"
                    pages={2}
                    display="inline"
                    touchUi={true}
                    onChange={(e) => setDateRange(e.value)}
                />
            </div>
            <div
                className={`dropdown-toggle ${showDropdown ? 'active' : ''}`}
                onClick={() => setShowDropdown(!showDropdown)}
                aria-haspopup="true"
                aria-expanded={showDropdown}
            >
                {adults} Adults, {children} Children
                {showDropdown && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <span>Adults</span>
                            <div>
                                <button onMouseDown={preventDropdownClose} onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>-</button>
                                <span>{adults}</span>
                                <button onMouseDown={preventDropdownClose} onClick={() => setAdults(adults + 1)}>+</button>
                            </div>
                        </div>
                        <div className="dropdown-item">
                            <span>Children</span>
                            <div>
                                <button onMouseDown={preventDropdownClose} onClick={() => setChildren(children - 1)} disabled={children <= 0}>-</button>
                                <span>{children}</span>
                                <button onMouseDown={preventDropdownClose} onClick={() => setChildren(children + 1)}> + </button>
                            </div>
                        </div>
                        <button className="done-button" onClick={handleDoneClick}>Done</button>
                    </div>
                )}
            </div>
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
            </div>
            <button className="search-button" onClick={handleSearch}>
                <FaSearch /> Search
            </button>
        </div>
    );
};

export default SearchBarFlight;
