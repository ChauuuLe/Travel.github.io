import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './findUsers.css';

const FindUsers = (props) => {
  const {
    data,
    onDataChange,
  } = props;
  
  const [username, setUsername] = useState('');
  const [foundedUser, setFoundedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userToAdd, setUserToAdd] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://travel-github-io.onrender.com/api/users/search?username=${username}`);
      setFoundedUser(response.data);
      setError('');
    } catch (err) {
      setFoundedUser(null);
      setError('User not found');
    }
    setLoading(false);
  };

  const renderAvatar = (avatar) => {
    if (avatar) {
      return avatar;
    }
    return "./assets/avatar.png";
  };

  const addUser = (newUser) => {
    onDataChange({
      ...data,
      members: [...data.members, newUser]
    });
  };

  const handleAddUser = () => {
    if (foundedUser) {
      addUser(foundedUser);
    } else {
      console.log('no user to add');
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
      <div className="addUser">
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
        {data.members.map(renderUser)}
      </div>
    </div>
  );
};

export default FindUsers;
