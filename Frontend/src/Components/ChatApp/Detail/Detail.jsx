import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./detail.css";

const Detail = () => {
  const [isOpen, setIsOpen] = useState({
    chatSettings: false,
    privacyHelp: false,
    sharedPhotos: false,
    sharedFiles: false
  });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  const toggleSection = (section) => {
    setIsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderAvatar = (avatar) => {
    if (avatar) {
      return avatar;
    }
    return "./assets/avatar.png";
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={renderAvatar(currentUser.avatar)} alt="User Avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="info">
        <div className="option">
          <div className="title" onClick={() => toggleSection('chatSettings')}>
            <span>Chat Settings</span>
            <img src={isOpen.chatSettings ? "./assets/arrowDown.png" : "./assets/arrowUp.png"} alt="Toggle" />
          </div>
        </div>
        {isOpen.chatSettings && (
          <div>
            {/* Chat settings content here */}
          </div>
        )}
        <div className="option">
          <div className="title" onClick={() => toggleSection('privacyHelp')}>
            <span>Privacy & help</span>
            <img src={isOpen.privacyHelp ? "./assets/arrowDown.png" : "./assets/arrowUp.png"} alt="Toggle" />
          </div>
        </div>
        {isOpen.privacyHelp && (
          <div>
            {/* Privacy and help content here */}
          </div>
        )}
        <div className="option">
          <div className="title" onClick={() => toggleSection('sharedPhotos')}>
            <span>Shared photos</span>
            <img src={isOpen.sharedPhotos ? "./assets/arrowDown.png" : "./assets/arrowUp.png"} alt="Toggle" />
          </div>
          {isOpen.sharedPhotos && (
            <div className="photos">
            </div>
          )}
        </div>
        <div className="option">
          <div className="title" onClick={() => toggleSection('sharedFiles')}>
            <span>Shared Files</span>
            <img src={isOpen.sharedFiles ? "./assets/arrowDown.png" : "./assets/arrowUp.png"} alt="Toggle" />
          </div>
        </div>
        {isOpen.sharedFiles && (
          <div>
            {/* Files display content here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail;