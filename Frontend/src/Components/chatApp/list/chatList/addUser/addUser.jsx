import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addUser.css';

const AddUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [username, setUsername] = useState('');
  const [foundedUser, setFoundedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userToAdd, setUserToAdd] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/users/search?username=${username}`);
      setFoundedUser(response.data);
      setError('');
    } catch (err) {
      setFoundedUser(null);
      setError('User not found');
    }
    setLoading(false);
  };

  const renderAvatar = (avatar) => {
    return avatar || "./assets/avatar.png";
  };

  const handleAddUser = async () => {
    if (foundedUser) {
      try {
        const token = localStorage.getItem('token');
        console.log("chat add");
        await axios.post("http://localhost:8080/api/chats", {
          receiverId: foundedUser._id,
        }, {
          headers: {
            'x-access-token': token,
          },
        });
        
        alert('Chat created successfully');
      } catch (err) {
        console.error('Error creating chat', err);
      }
    }
  };

  useEffect(() => {
    if (foundedUser) {
      setUserToAdd(
        <div className='user'>
          <div className="detail">
            <img src={renderAvatar(foundedUser.avatar)} alt="User Avatar" />
            <span>{foundedUser.username}</span>
          </div>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      );
    } else if (error) {
      setUserToAdd(
        <div className='not-found-message'>
          {error}
        </div>
      );
    } else {
      setUserToAdd(null);
    }
  }, [foundedUser, error]);

  return (
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
  );
};

export default AddUser;
