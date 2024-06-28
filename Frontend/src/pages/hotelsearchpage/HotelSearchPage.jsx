import React from 'react';
import Navbar from '../navbar/navbar';
import SearchBar from '../../Components/searchbar/searchbarhotel';
import Footer from '../footer/Footer';
import videoBg from '../../assets/vidbg.mp4';
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

const HomeSearchPage = () => {
    const featuredHotels = [
        {
            image: 'path_to_image/hotel1.jpg',
            name: 'The Hotel Apartments in the Center of Amsterdam',
            rating: 9.1,
            reviews: 400,
            location: 'Amsterdam, Netherlands',
            price: 'VND 27,026,983'
        },
        {
            image: 'path_to_image/hotel2.jpg',
            name: 'SWEETS - Overtoomse Sluis',
            rating: 9.0,
            reviews: 56,
            location: 'Amsterdam, Netherlands',
            price: 'VND 7,978,741'
        },
        {
            image: 'path_to_image/hotel3.jpg',
            name: 'Zoku Amsterdam',
            rating: 8.9,
            reviews: 2789,
            location: 'Amsterdam, Netherlands',
            price: 'VND 9,299,264'
        },
        {
            image: 'path_to_image/hotel4.jpg',
            name: 'PREMIER SUITES PLUS Amsterdam',
            rating: 8.8,
            reviews: 1368,
            location: 'Amsterdam, Netherlands',
            price: 'VND 8,588,171'
        }
    ];

    const exploreDestinations = [
        {
            image: 'path_to_image/spain.jpg',
            name: 'Spain',
            rentals: 166514
        },
        {
            image: 'path_to_image/italy.jpg',
            name: 'Italy',
            rentals: 179454
        },
        {
            image: 'path_to_image/france.jpg',
            name: 'France',
            rentals: 181734
        },
        {
            image: 'path_to_image/greece.jpg',
            name: 'Greece',
            rentals: 60560
        },
        {
            image: 'path_to_image/switzerland.jpg',
            name: 'Switzerland',
            rentals: 14211
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
                <h2>Homes guests love</h2>
                <div className="featured-hotels">
                    {featuredHotels.map((hotel, index) => (
                        <div className="hotel-card" key={index}>
                            <img src={hotel.image} alt={hotel.name} />
                            <div className="hotel-info">
                                <h3>{hotel.name}</h3>
                                <p>{hotel.location}</p>
                                <p>Rating: {hotel.rating} ({hotel.reviews} reviews)</p>
                                <p>Starting from {hotel.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h2>Feel at home wherever you go</h2>
                <div className="explore-destinations">
                    {exploreDestinations.map((destination, index) => (
                        <div className="destination-card" key={index}>
                            <img src={destination.image} alt={destination.name} />
                            <div className="destination-info">
                                <h3>{destination.name}</h3>
                                <p>{destination.rentals} holiday rentals</p>
                                <button className="explore-button">Explore</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeSearchPage;
