import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProfileMenu.css";

const ProfileMenu = ({ currentUser, handleLogout }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="profile-menu" ref={dropdownRef}>
            <img
                src={currentUser.avatarUrl || 'default-avatar.png'}
                alt="Profile"
                className="avatar"
                onClick={toggleDropdown}
            />
            {isDropdownVisible && (
                <div className="profile-dropdown">
                    <button onClick={handleProfileClick}>Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
