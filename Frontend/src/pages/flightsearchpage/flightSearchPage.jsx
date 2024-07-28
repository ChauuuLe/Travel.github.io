import React, { useState, useRef } from 'react';
import Navbar from '../navbar/navbar';
import FlightSearchForm from '../../Components/SearchBar/SearchBarFlight';
import FlightSearchResult from '../../Components/FlightSearchResult/FlightSearchResult';
import Footer from '../footer/Footer';
import './FlightSearchPage.css';

const FlightSearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const resultsRef = useRef(null);

    const handleSearchResults = (results) => {
        setSearchResults(results.length > 0 ? results : 'No flights found');
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
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
            <div className="content-section" ref={resultsRef}>
                <h2>Search Results</h2>
                <FlightSearchResult results={searchResults} />
            </div>
            <Footer />
        </div>
    );
};

export default FlightSearchPage;
