import React, { useState } from 'react';
import axios from 'axios';
import HotelSearchForm from '../../Components/SearchBar/HotelSearchForm';
import HotelResults from '../../Components/HotelResult/HotelResult';

function HotelSearchPage() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchHotels = async (searchParams) => {
    const url = `${import.meta.env.VITE_BACKEND}/api/hotels`;
    setIsLoading(true); // Start loading

    try {
      const response = await axios.get(url, { params: searchParams });
      const data = response.data;

      if (data.error) {
        setError(data.error);
        setHotels([]);
      } else if (data.not_found) {
        setError(data.not_found);
        setHotels([]);
      } else {
        setHotels(data.properties);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Error fetching hotels. Please try again later.');
      setHotels([]);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSearch = async (searchParams) => {
    console.log(searchParams);
    await fetchHotels(searchParams);
  };

  return (
    <div className="HotelSearchPage">
      <h1>Hotel Search</h1>
      <HotelSearchForm onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading...</p> // You can replace this with a spinner or a more sophisticated loading component
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <HotelResults hotels={hotels} />
        </>
      )}
    </div>
  );
}

export default HotelSearchPage;
