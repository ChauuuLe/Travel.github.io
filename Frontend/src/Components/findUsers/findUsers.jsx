import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './findUsers.css';
import { useNavigate } from 'react-router-dom';

const FindUsers = (props) => {
  const {
    data,
    onDataChangeMember,
    onDataChangeSelectedDates,
  } = props;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [username, setUsername] = useState('');
  const [foundedUser, setFoundedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userToAdd, setUserToAdd] = useState(null); // Initialize userToAdd here
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/search?username=${username}`);
      setFoundedUser(response.data);
      setError('');
    } catch (err) {
      setFoundedUser(null);
      setError('User not found');
    }
    setLoading(false);
  };

  const renderAvatar = (avatar) => {
    return avatar ? avatar : "./assets/avatar.png";
  };

  const addUser = (newUser) => {
    onDataChangeMember([...data.members, newUser]);
    const dateStatusMap = data.dates.reduce((acc, date) => {
      acc[date] = 'unknown';
      return acc;
    }, {});
    onDataChangeSelectedDates({
      ...data.selectedDates,
      [newUser.username]: dateStatusMap,
    });
  };

  const handleAddUser = () => {
    if (foundedUser) {
      addUser(foundedUser);
    }
  };

  const renderUser = (user) => (
    <div className='user' key={user._id}>
      <div className="detail">
        <img src={renderAvatar(user.avatar)} alt="User Avatar" />
        <span>{user.username}</span>
      </div>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );

  useEffect(() => {
    if (foundedUser || error) {
      setUserToAdd(
        foundedUser ? renderUser(foundedUser) : <div className='not-found-message'>{error}</div>
      );
    } else {
      setUserToAdd(null);
    }
  }, [foundedUser, error]);

  return (
    <div>
      <div className="findUsers">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {userToAdd}
      </div>
      <div>
        {data.members.map((user) => (
          <div className='user' key={user._id}>
            <div className="detail">
              <img src={renderAvatar(user.avatar)} alt="User Avatar" />
              <span>{user.username}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindUsers;
