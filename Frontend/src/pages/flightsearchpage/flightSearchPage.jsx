import React from 'react';
import Navbar from '../navbar/navbar';
import SearchBar from '../../Components/searchbar/SearchBarFlight';
import Footer from '../footer/Footer';
import './flightSearchPage.css';

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

const FlightSearchPage = () => {
    const featuredFlights = [
        {
            image: 'path_to_image/flight1.jpg',
            name: 'Vietnam Airlines',
            rating: 4.5,
            reviews: 320,
            location: 'Ho Chi Minh City to Hanoi',
            price: 'VND 2,000,000'
        },
        {
            image: 'path_to_image/flight2.jpg',
            name: 'Singapore Airlines',
            rating: 4.7,
            reviews: 410,
            location: 'Singapore to Seoul',
            price: 'VND 5,000,000'
        },
        {
            image: 'path_to_image/flight3.jpg',
            name: 'Qatar Airways',
            rating: 4.8,
            reviews: 540,
            location: 'Bangkok to Paris',
            price: 'VND 12,000,000'
        },
        {
            image: 'path_to_image/flight4.jpg',
            name: 'Emirates',
            rating: 4.6,
            reviews: 460,
            location: 'Dubai to New York',
            price: 'VND 20,000,000'
        }
    ];

    return (
        <div className="homepage">
            <Navbar />
            <div className="video-section">
                <video src={videoBg} className="background-video" muted autoPlay loop type="video/mp4"></video>
                <div className="overlay"></div>
                <div className="search-bar-container">
                    <SearchBar suggestions={suggestions} />
                </div>
            </div>
            <div className="content-section">
                <h2>Popular Flights</h2>
                <div className="featured-flights">
                    {featuredFlights.map((flight, index) => (
                        <div className="flight-card" key={index}>
                            <img src={flight.image} alt={flight.name} />
                            <div className="flight-info">
                                <h3>{flight.name}</h3>
                                <p>{flight.location}</p>
                                <p>Rating: {flight.rating} ({flight.reviews} reviews)</p>
                                <p>Starting from {flight.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FlightSearchPage;
