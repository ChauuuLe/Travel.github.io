import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 6;
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [showAvatarForm, setShowAvatarForm] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/${userId}/destinations`);
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchUser();
    fetchDestinations();
  }, [userId]);

  const handleAvatarClick = () => {
    if (currentUser && currentUser._id === userId) {
      setShowAvatarForm(true);
    } else {
      alert('You are not authorized to change this avatar.');
    }
  };

  const handleAvatarChange = (e) => {
    setNewAvatarUrl(e.target.value);
  };

  const handleAvatarUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/users/${userId}/avatar`,
        { avatar: newAvatarUrl },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      setUser({ ...user, avatar: newAvatarUrl });
      setShowAvatarForm(false);
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = destinations.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(destinations.length / destinationsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="user-profile">
      {user && (
        <div className="profile-content">
          <div className="avatar-section" onClick={handleAvatarClick}>
            <img src={user.avatar || "./assets/avatar.png"} alt="User Avatar" className="avatard" />
            {currentUser && currentUser._id === userId && !showAvatarForm && (
              <p className="click-to-change">Click to change avatar</p>
            )}
          </div>
          {showAvatarForm && (
            <div className="avatar-form">
              <input
                type="text"
                value={newAvatarUrl}
                onChange={handleAvatarChange}
                placeholder="Enter new avatar URL"
              />
              <button onClick={handleAvatarUpdate}>Update Avatar</button>
              <button onClick={() => setShowAvatarForm(false)}>Cancel</button>
            </div>
          )}
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
      )}

      <div className="user-destinations">
        <h2>Created Destinations</h2>
        {currentDestinations.length > 0 ? (
          <div className="destination-cards-container">
            <div className="destination-cards">
              {currentDestinations.map(destination => (
                <Link to={`/destinations/${destination._id}`} key={destination._id} className="destination-card-link">
                  <div className="destination-card">
                    <img src={destination.images[0]} alt={destination.name} className="destination-card-image" />
                    <h3>{destination.name}</h3>
                    <p>Country: {destination.country}</p>
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
        ) : (
          <p>No destinations found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
