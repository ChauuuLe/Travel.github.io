import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FindUsers from '../../Components/findUsers/findUsers.jsx';
import './createGroup.css';

const pages = ['findUsers'];

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentPageIndex = pages.indexOf(location.pathname.split('/')[2] || 'findUsers');

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const [formData, setFormData] = useState({
    listOfUsers: {
      members: [],
    },
  });

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

  const renderCurrentPages = () => {
    if (currentPageIndex === 0) {
      return (
        <FindUsers 
          data={formData.listOfUsers} 
          onDataChange={(data) => handleFormDataChange('listOfUsers', data)} 
        />
      );
    }
  }

  return (
    <div>
      <div>
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
