import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './groupName.css';

const GroupName = (props) => {
  const {
    data,
    onDataChange,
    onSubmit,
  } = props;
  const [groupName, setGroupName] = useState(data.groupName || '');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
    onDataChange({ groupName: e.target.value });
  };

  return (
    <div className="group-name-container">
      <input
        type="text"
        value={groupName}
        onChange={handleInputChange}
        placeholder="Enter group name"
      />
      <button onClick={onSubmit}>Create Group</button>
    </div>
  );
};

export default GroupName;
