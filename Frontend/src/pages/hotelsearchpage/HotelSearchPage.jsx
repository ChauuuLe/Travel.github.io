import React, { useState } from 'react';
import axios from 'axios';

const HotelSearchPage = () => {
    const [destination, setDestination] = useState('');
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const searchHotels = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/hotels/search', {
                params: { destination },
            });
            setHotels(response.data);
        } catch (err) {
            console.error('Error fetching hotels:', err);
            setError('Failed to fetch hotels. Please try again.');
        }
        setLoading(false);
    };

    const fetchHotelDetails = async (hotelId) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails',
                params: {
                    hotel_id: hotelId,
                    adults: '1',
                    children_age: '1,17',
                    room_qty: '1',
                    units: 'metric',
                    temperature_unit: 'c',
                    languagecode: 'en-us',
                    currency_code: 'EUR',
                },
                headers: {
                    'x-rapidapi-key': e6e7141d79mshf85747c50059a5bp1526a9jsnbeb5dbd40958,
                    'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
                },
            };

            const response = await axios.request(options);
            setSelectedHotel(response.data);
        } catch (error) {
            console.error('Error fetching hotel details:', error);
        }
    };

    return (
        <div className="hotel-search-page">
            <h1>Find Hotels</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                />
                <button onClick={searchHotels} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {hotels.length > 0 && (
                <div className="hotel-list">
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="hotel-card" onClick={() => fetchHotelDetails(hotel.id)}>
                            <h2>{hotel.name}</h2>
                            <p>{hotel.address}</p>
                            <p>Price: {hotel.price}</p>
                            <p>Rating: {hotel.rating}</p>
                            <a href={hotel.url} target="_blank" rel="noopener noreferrer">View on Booking.com</a>
                        </div>
                    ))}
                </div>
            )}
            {selectedHotel && (
                <div className="hotel-details">
                    <h2>{selectedHotel.name}</h2>
                    {/* Render more details here */}
                </div>
            )}
        </div>
    );
};

export default HotelSearchPage;
