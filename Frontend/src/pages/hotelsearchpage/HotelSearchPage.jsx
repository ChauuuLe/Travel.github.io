import React, { useState } from 'react';
import './HotelSearchPage.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/Footer';

const HotelSearchPage = () => {
    const [location, setLocation] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [hotels, setHotels] = useState([]); // State to hold search results

    const searchHotels = () => {
        // Mock search logic (replace with actual API call)
        const mockHotels = [
            {
                id: 1,
                name: 'Hotel Lux',
                location: 'Paris',
                price: 250,
                rating: 4.5,
                image: './src/assets/hotel-lux.jpg'
            },
            {
                id: 2,
                name: 'Ocean View Resort',
                location: 'Miami',
                price: 300,
                rating: 4.8,
                image: './src/assets/ocean-view.jpg'
            },
            {
                id: 3,
                name: 'Mountain Retreat',
                location: 'Aspen',
                price: 200,
                rating: 4.3,
                image: './src/assets/mountain-retreat.jpg'
            },
        ];
        setHotels(mockHotels);
    };

    return (
        <div className="hotel-search-page">
            <Navbar />
            <div className="search-container">
                <h1>Find the Best Hotels</h1>
                <div className="search-form">
                    <div className="input-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                        />
                    </div>
                    <div className="input-group">
                        <label>Check-in Date:</label>
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Check-out Date:</label>
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Guests:</label>
                        <input
                            type="number"
                            value={guests}
                            min="1"
                            onChange={(e) => setGuests(e.target.value)}
                        />
                    </div>
                    <button onClick={searchHotels}>Search</button>
                </div>
            </div>
            <div className="hotel-results">
                {hotels.length > 0 ? (
                    hotels.map(hotel => (
                        <div key={hotel.id} className="hotel-card">
                            <img src={hotel.image} alt={hotel.name} />
                            <div className="hotel-info">
                                <h2>{hotel.name}</h2>
                                <p>{hotel.location}</p>
                                <p>Price: ${hotel.price} per night</p>
                                <p>Rating: {hotel.rating}</p>
                                <button className="book-now">Book Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hotels found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HotelSearchPage;
