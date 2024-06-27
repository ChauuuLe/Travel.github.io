import React, { useState } from 'react';
import './SearchBarHotel.css';
import { FaSearch, FaCalendarCheck, FaCalendarDay } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = ({ suggestions }) => {
    const [input, setInput] = useState('');
    const [fetchedSuggestions, setFetchedSuggestions] = useState([]);
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

    const handleInputChange = async (e) => {
        setInput(e.target.value);
        if (e.target.value.length > 2) {
            fetchSuggestions(e.target.value);
        }
    };

    const fetchSuggestions = async (query) => {
        const apiKey = 'YOUR_OPENCAGE_API_KEY';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=5`;

        try {
            const response = await axios.get(url);
            setFetchedSuggestions(response.data.results.map(result => result.formatted));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setInput(suggestion);
        setFetchedSuggestions([]);
    };

    const handleSearch = () => {
        const bookingUrl = `https://www.booking.com/searchresults.html?ss=${input}&checkin_monthday=${new Date(checkInDate).getDate()}&checkin_month=${new Date(checkInDate).getMonth() + 1}&checkin_year=${new Date(checkInDate).getFullYear()}&checkout_monthday=${new Date(checkOutDate).getDate()}&checkout_month=${new Date(checkOutDate).getMonth() + 1}&checkout_year=${new Date(checkOutDate).getFullYear()}&group_adults=${adults}&group_children=${children}&no_rooms=${rooms}`;
        window.location.href = bookingUrl;
    };

    const todayDate = new Date().toISOString().split('T')[0];

    return (
        <div className="search-bar">
            <div className="input-group">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Enter a destination or property"
                    value={input}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                />
                {showSuggestions && (
                    <div className="suggestions-box">
                        {fetchedSuggestions
                            .filter(suggestion => suggestion.toLowerCase().includes(input.toLowerCase()))
                            .map((suggestion, index) => (
                                <div key={index} className="suggestion-item" onMouseDown={() => handleSelectSuggestion(suggestion)}>
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
                        min={todayDate} // Set the minimum date to today
                        onChange={handleCheckInChange}
                    />
                </div>
                <div className="input-group date">
                    <FaCalendarDay />
                    <input
                        type="date"
                        value={checkOutDate}
                        min={checkInDate || todayDate} // Set the minimum date to check-in date or today
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
            <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
