import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateDestination.css';

const CreateDestination = ({ currentUser, onCreate }) => {
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    images: [],
    country: '',
    city: '',
    activities: [],
    averageCost: 0
  });

  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: '',
    cost: 0,
    image: ''
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const countryIso = event.target.value;
    setNewDestination(prevState => ({
      ...prevState,
      country: countryIso,
      city: ''
    }));
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/countries/${countryIso}`);
      setCountryDetails(response.data);
      setCities(response.data.cities || []); // Ensure cities are properly set
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setNewDestination(prevState => ({
      ...prevState,
      city: city
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDestination(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUrlChange = (event) => {
    setNewImageUrl(event.target.value);
  };

  const addImageUrl = () => {
    if (newImageUrl) {
      setNewDestination(prevState => ({
        ...prevState,
        images: [...prevState.images, newImageUrl]
      }));
      setNewImageUrl('');
    }
  };

  const handleActivityChange = (event) => {
    const { name, value } = event.target;
    setNewActivity(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const openAddActivity = () => {
    setIsAddingActivity(true);
  };

  const closeAddActivity = () => {
    setIsAddingActivity(false);
    setNewActivity({ name: '', cost: 0, image: '' });
  };

  const addActivity = () => {
    setNewDestination(prevState => ({
      ...prevState,
      activities: [...prevState.activities, newActivity]
    }));
    closeAddActivity();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/destinations`, {
        ...newDestination,
        author: currentUser._id
      });

      onCreate(response.data);
      setNewDestination({
        name: '',
        description: '',
        images: [],
        country: '',
        city: '',
        activities: [],
        averageCost: 0
      });
    } catch (error) {
      console.error('Error creating destination:', error);
    }
  };

  return (
    <div className="create-destination-container">
      <form onSubmit={handleFormSubmit} className="create-destination-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newDestination.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newDestination.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <div className="image-url-input">
          <input
            type="text"
            placeholder="Image URL"
            value={newImageUrl}
            onChange={handleImageUrlChange}
          />
          <button type="button" onClick={addImageUrl}>Add Image URL</button>
        </div>
        <div className="image-url-list">
          <h4>Image URLs</h4>
          <ul>
            {newDestination.images.map((image, index) => (
              <li key={index}>{image}</li>
            ))}
          </ul>
        </div>
        <select name="country" value={newDestination.country} onChange={handleCountryChange} required>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.iso2} value={country.iso2}>
              {country.name}
            </option>
          ))}
        </select>
        {countryDetails && (
          <div className="country-details">
            <h4>Country Details</h4>
            <p><strong>Name:</strong> {countryDetails.name}</p>
            <p>{countryDetails.emoji}</p>
            <p><strong>ISO Code:</strong> {countryDetails.iso2}</p>
          </div>
        )}
        <select name="city" value={newDestination.city} onChange={handleCityChange} required>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="averageCost"
          placeholder="Average Cost"
          value={newDestination.averageCost}
          onChange={handleInputChange}
          required
        />
        <button type="button" onClick={openAddActivity}>Add Activity</button>
        <button type="submit">Create</button>
      </form>
      {isAddingActivity && (
        <div className="add-activity-modal">
          <div className="add-activity-content">
            <h3>Add Activity</h3>
            <input
              type="text"
              name="name"
              placeholder="Activity Name"
              value={newActivity.name}
              onChange={handleActivityChange}
              required
            />
            <input
              type="number"
              name="cost"
              placeholder="Activity Cost"
              value={newActivity.cost}
              onChange={handleActivityChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Activity Image URL"
              value={newActivity.image}
              onChange={handleActivityChange}
              required
            />
            <button onClick={addActivity}>Add</button>
            <button onClick={closeAddActivity}>Cancel</button>
          </div>
        </div>
      )}
      <div className="activity-list">
        <h3>Activities</h3>
        <ul>
          {newDestination.activities.map((activity, index) => (
            <li key={index}>{activity.name} - ${activity.cost}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateDestination;
