import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateDestination from '../../Components/CreateDestination/CreateDestination';
import SearchDestination from '../../Components/SearchDestination/SearchDestination';
import './DestinationList.css';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [formattedData, setFormattedData] = useState({});
  const [searchTermCountry, setSearchTermCountry] = useState('');
  const [searchTermCity, setSearchTermCity] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 6; // 3 cards per row * 3 rows per page
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/destinations`);
      const data = response.data;

      const formatted = data.reduce((acc, destination) => {
        const country = destination.country || 'Unknown';
        const city = destination.city || 'Unknown';
        if (!acc[country]) {
          acc[country] = {};
        }
        if (!acc[country][city]) {
          acc[country][city] = [];
        }
        acc[country][city].push(destination);
        return acc;
      }, {});

      setDestinations(data);
      setFormattedData(formatted);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSearchChangeCountry = (event) => {
    setSearchTermCountry(event.target.value);
  };

  const handleSearchChangeCity = (event) => {
    setSearchTermCity(event.target.value);
  };

  const handleCreateButtonClick = () => {
    if (currentUser) {
      setIsCreating(!isCreating);
    } else {
      alert('You must be logged in to create a destination.');
    }
  };

  const handleCreate = async (newDestination) => {
    try {
      await fetchDestinations();
      setIsCreating(false);
      setCurrentPage(1); // Reset to first page to show the new destination
    } catch (error) {
      console.error('Error creating destination:', error);
    }
  };

  const filteredCountries = Object.keys(formattedData).filter(country =>
    country.toLowerCase().includes(searchTermCountry.toLowerCase())
  );

  const filteredCities = filteredCountries.length > 0
    ? Object.keys(formattedData[filteredCountries[0]]).filter(city =>
      city.toLowerCase().includes(searchTermCity.toLowerCase())
    )
    : [];

  const filteredDestinations = searchTermCountry || searchTermCity
    ? (filteredCountries.length > 0 && filteredCities.length > 0
      ? formattedData[filteredCountries[0]][filteredCities[0]]
      : [])
    : destinations;

  // Pagination logic
  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="destinations-list">
      <h1>Destinations</h1>
      <SearchDestination
        searchTerm={searchTermCountry}
        handleSearchChange={handleSearchChangeCountry}
        placeholder="Search countries..."
      />
      <SearchDestination
        searchTerm={searchTermCity}
        handleSearchChange={handleSearchChangeCity}
        placeholder="Search cities..."
      />
      <button className="button-create-destination" onClick={handleCreateButtonClick}>
        Create New Destination
      </button>


      {/* Modal Overlay for Creating Destination */}
      {isCreating && (
        <div className="create-destination-modal">
          <div className="create-destination-content">
            <CreateDestination currentUser={currentUser} onCreate={handleCreate} />
            <button className="close-button" onClick={() => setIsCreating(false)}>X</button>
          </div>
        </div>
      )}

      <div className="destination-cards-container">
        <div className="destination-cards">
          {currentDestinations.map(destination => (
            <Link to={`/destinations/${destination._id}`} key={destination._id}>
              <div className="destination-card">
                <img src={destination.images[0]} alt={destination.name} />
                <h3>{destination.name}</h3>
                <p>Country: {destination.emoji} {destination.country}</p>
                <p>City: {destination.city}</p>
                <p>Author: {destination.author.username}</p>
                <p>Avg Cost: ${destination.averageCost}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationList;
