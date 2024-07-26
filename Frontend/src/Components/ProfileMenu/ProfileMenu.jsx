import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

const ProfileMenu = ({ currentUser, handleLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      className="profile-menu"
      onMouseEnter={() => setIsDropdownVisible(true)}
      onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <img
        src={currentUser.avatarUrl || 'default-avatar.png'}
        alt="Profile"
        className="avatar"
        onClick={toggleDropdown}
      />
      {isDropdownVisible && (
        <div
          className="profile-dropdown"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <button onClick={handleProfileClick}>
            <i className="fas fa-user"></i> Profile
          </button>
          <button onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
