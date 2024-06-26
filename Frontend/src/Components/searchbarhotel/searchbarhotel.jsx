import React, { useState } from 'react';
import './SearchBarHotel.css';
import { FaSearch, FaCalendarCheck, FaCalendarDay } from 'react-icons/fa';

const SearchBar = ({ suggestions }) => {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const handleCheckOutChange = (e) => {
        if (new Date(e.target.value) >= new Date(checkInDate)) {
            setCheckOutDate(e.target.value);
        } else {
            alert("Check-out date must be after the check-in date.");
        }
    };

    const handleCheckInChange = (e) => {
        if (new Date(e.target.value) >= new Date().setHours(0, 0, 0, 0)) {
            setCheckInDate(e.target.value);
        } else {
            alert("Check-in date cannot be earlier than today.");
        }
    };

    return (
        <div className="search-bar">
            <div className="input-group">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Enter a destination or property"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                />
                {showSuggestions && (
                    <div className="suggestions-box">
                        {suggestions
                            .filter(suggestion => suggestion.toLowerCase().includes(input.toLowerCase()))
                            .map((suggestion, index) => (
                                <div key={index} className="suggestion-item" onMouseDown={() => setInput(suggestion)}>
                                    {suggestion}
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div className="date-group">
                <div className="input-group date">
                    <FaCalendarCheck />
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={handleCheckInChange}
                    />
                </div>
                <div className="input-group date">
                    <FaCalendarDay />
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={handleCheckOutChange}
                    />
                </div>
            </div>
            <div
                className={`dropdown-toggle ${showDropdown ? 'active' : ''}`}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {adults} Adults, {children} Children
                {showDropdown && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <span>Room</span>
                            <div>
                                <button onClick={() => setRooms(rooms - 1)} disabled={rooms <= 1}>-</button>
                                <span>{rooms}</span>
                                <button onClick={() => setRooms(rooms + 1)}>+</button>
                            </div>
                        </div>
                        <div className="dropdown-item">
                            <span>Adults</span>
                            <div>
                                <button onClick={() => setAdults(adults - 1)} disabled={adults <= 1}>-</button>
                                <span>{adults}</span>
                                <button onClick={() => setAdults(adults + 1)}>+</button>
                            </div>
                        </div>
                        <div className="dropdown-item">
                            <span>Children</span>
                            <div>
                                <button onClick={() => setChildren(children - 1)} disabled={children <= 0}>-</button>
                                <span>{children}</span>
                                <button onClick={() => setChildren(children + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button className="search-button">Search</button>
        </div>
    );
};

export default SearchBar;
