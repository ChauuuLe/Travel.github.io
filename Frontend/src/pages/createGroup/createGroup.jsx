import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import FindUsers from '../../Components/findUsers/findUsers.jsx';
import Schedule from '../../Components/schedule/schedule.jsx';
import GroupName from '../../Components/groupName/groupName.jsx';
import './createGroup.css';
import backgroundVideo from '../../assets/background/video.mp4'; 

const pages = ['findusers', 'schedule', 'groupname'];

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentPageIndex = pages.indexOf(location.pathname.split('/')[2] || 'findusers');

  useEffect(() => {
    document.body.classList.add('create-group-page');
    return () => {
      document.body.classList.remove('create-group-page');
    };
  }, []);

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
    members: [currentUser],
    dates: [],
    selectedDates: {
      [currentUser.username]: {}
    },
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
    setFormData(prevFormData => ({
      ...prevFormData,
      [page]: data,
    }));
  };

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/current`, {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        localStorage.removeItem('formData');
        const user = await getCurrentUser();
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/tripgroup');
      } else {
        console.log('Failed to create group');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const renderCurrentPages = () => {
    switch (currentPageIndex) {
      case 0:
        return (
          <>
            <FindUsers 
              data={formData} 
              onDataChangeMember={(data) => handleFormDataChange('members', data)}
              onDataChangeSelectedDates={(data) => handleFormDataChange('selectedDates', data)}
            />
          </>
        );
      case 1:
        return (
          <Schedule
            members={formData.members}
            selectedDates={formData.selectedDates}
            dates={formData.dates}
            onDataChangeDates={(data) => handleFormDataChange('dates', data)}
            onDataChangeSelectedDates={(data) => handleFormDataChange('selectedDates', data)}
          />
        );
      case 2:
        return (
          <GroupName
            data={formData.groupName}
            onDataChange={(data) => handleFormDataChange('groupName', data)}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-group-container">
      <video className="background-video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
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
