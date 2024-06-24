import React from 'react';
import Navbar from '../navbar/navbar';
import SearchBar from '../../Components/searchbarhotel/searchbarhotel';
import Footer from '../footer/Footer';
import videoBg from '../../../../Backend (server and db)/app/assets/images/video.mp4';
import './HotelSearchPage.css';

const suggestions = [
    'Ho Chi Minh City',
    'Hanoi',
    'Da Nang',
    'Nha Trang',
    'Vung Tau',
    'Singapore',
    'Seoul',
    'Bangkok'
];

const HomePage = () => {
    return (
        <div className="homepage">
            <Navbar />
            <div className="video-section">
                <div className="overlay"></div>
                <div className="search-bar-container">
                    <SearchBar suggestions={suggestions} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
