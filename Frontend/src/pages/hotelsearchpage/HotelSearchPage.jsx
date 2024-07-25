import React, { useState } from 'react';
import axios from 'axios';
import HotelSearchForm from '../../Components/SearchBar/HotelSearchForm';
import HotelResults from '../../Components/hotelResult/hotelResult';

function HotelSearchPage() {
    const [hotels, setHotels] = useState([]);
    const [formattedHotels, setFormattedHotels] = useState({});
    const [error, setError] = useState('');

    const fetchHotels = async (searchParams) => {
        const url = `${import.meta.env.VITE_BACKEND}/api/hotels`;

        try {
            const response = await axios.get(url, { params: searchParams });
            const data = response.data;

            if (data.error) {
                setError(data.error);
                setHotels([]);
                setFormattedHotels({});
                return;
            }

            const formatted = data.hotels.reduce((acc, hotel) => {
                const city = hotel.city || 'Unknown';
                const country = hotel.country || 'Unknown';

                if (!acc[country]) {
                    acc[country] = {};
                }
                if (!acc[country][city]) {
                    acc[country][city] = [];
                }
                acc[country][city].push(hotel);

                return acc;
            }, {});

            setHotels(data.hotels || []);
            setFormattedHotels(formatted);
            setError('');
        } catch (error) {
            console.error('Error fetching hotels:', error);
            setError('Error fetching hotels. Please try again later.');
            setHotels([]);
            setFormattedHotels({});
        }
    };

    const handleSearch = async (searchParams) => {
        await fetchHotels(searchParams);
    };

    return (
        <div className="HotelSearchPage">
            <h1>Hotel Search</h1>
            <HotelSearchForm onSearch={handleSearch} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <HotelResults hotels={formattedHotels} />
        </div>
    );
}

export default HotelSearchPage;
