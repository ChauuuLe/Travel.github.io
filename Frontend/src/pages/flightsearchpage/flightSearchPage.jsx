import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import FlightSearchForm from '../SearchBarFlight/FlightSearchForm';
import FlightSearchResult from '../FlightSearchResult/FlightSearchResult';
import Footer from '../footer/Footer';
import videoBg from '../../assets/video.mp4';
import './flightSearchPage.css';

const FlightSearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div className="homepage">
            <Navbar />
            <div className="video-section">
                <video src={videoBg} className="background-video" muted autoPlay loop type="video/mp4"></video>
                <div className="overlay"></div>
                <div className="search-bar-container">
                    <FlightSearchForm onSearch={handleSearchResults} />
                </div>
            </div>
            <div className="content-section">
                <h2>Search Results</h2>
                <FlightSearchResult results={searchResults} />
            </div>
            <Footer />
        </div>
    );
};

export default FlightSearchPage;
