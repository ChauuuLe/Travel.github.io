import React, { useState } from 'react';
import axios from 'axios';
import FlightSearchForm from '../../Components/SearchBar/SearchBarFlight';
import FlightSearchResult from '../../Components/FlightSearchResult/FlightSearchResult';
import './FlightSearchPage.css';

const FlightSearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlights = async (searchParams) => {
    const url = `${import.meta.env.VITE_BACKEND}/api/flights`;
    setIsLoading(true);

    try {
      const response = await axios.get(url, { params: searchParams });
      const data = response.data;

      if (data.error) {
        setError(data.error);
        setFlights([]);
      } else if (data.not_found) {
        setError(data.not_found);
        setFlights([]);
      } else {
        setFlights(data.best_flights);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Error fetching flights. Please try again later.');
      setFlights([]);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  const handleSearch = async (searchParams) => {
    await fetchFlights(searchParams);
  };

  return (
    <div className="FlightSearchPage">
      <FlightSearchForm onSearch={handleSearch} />
      {isLoading ? (
        <p className="loading">Loading...</p> 
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <FlightSearchResult results={flights} />
        </>
      )}
    </div>
  );
};

export default FlightSearchPage;
