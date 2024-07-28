import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css';

const ProfileMenu = ({ currentUser, handleLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    console.log(currentUser._id);
    navigate(`/profile/${currentUser._id}`);
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
          <button onClick={handleProfileClick}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
