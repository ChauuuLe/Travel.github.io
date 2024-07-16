import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FindUsers from '../../Components/findUsers/findUsers.jsx';
import Schedule from '../../Components/schedule/schedule.jsx';
import GroupName from '../../Components/groupName/groupName.jsx';
import './createGroup.css';

const pages = ['findusers', 'schedule', 'groupname'];

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentPageIndex = pages.indexOf(location.pathname.split('/')[2] || 'findusers');

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const savedFormData = JSON.parse(localStorage.getItem('formData'));
  const [formData, setFormData] = useState(savedFormData || {
    listOfUsers: {
      members: [],
    },
    selectedDates: [],
    groupName: '',
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    const nextPageIndex = (currentPageIndex + 1) % pages.length;
    navigate(`/creategroup/${pages[nextPageIndex]}`);
  };

  const handlePrevious = () => {
    const previousPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    navigate(`/creategroup/${pages[previousPageIndex]}`);
  };

  const handleFormDataChange = (page, data) => {
    setFormData({
      ...formData,
      [page]: data,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.backend}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Successful created');
        navigate('/tripgroup');
      } else {
        console.error('Failed to create group');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderCurrentPages = () => {
    if (currentPageIndex === 0) {
      return (
        <FindUsers 
          data={formData.listOfUsers} 
          onDataChange={(data) => handleFormDataChange('listOfUsers', data)} 
        />
      );
    } else if (currentPageIndex === 1) {
      return (
        <Schedule
          members={formData.listOfUsers.members}
          dates={formData.selectedDates}
          onDataChange={(data) => handleFormDataChange('selectedDates', data)}
        />
      );
    } else if (currentPageIndex === 2) {
      return (
        <GroupName
          data={formData.groupName}
          onDataChange={(data) => handleFormDataChange('groupName', data)}
          onSubmit={handleSubmit}
        />
      );
    }
  };

  return (
    <div className="create-group-container">
      <div className="content">
        {renderCurrentPages()}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPageIndex === 0}>
          &lt; Previous
        </button>
        <div className="dots">
          {pages.map((page, index) => (
            <span
              key={index}
              className={`dot ${index === currentPageIndex ? 'active' : ''}`}
            ></span>
          ))}
        </div>
        <button onClick={handleNext} disabled={currentPageIndex === pages.length - 1}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
