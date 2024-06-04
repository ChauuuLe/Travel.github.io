import React, { useState } from 'react';
import "./detail.css";

const Detail = () => {
    const [isOpen, setIsOpen] = useState({
        chatSettings: false,
        privacyHelp: false,
        sharedPhotos: false,
        sharedFiles: false
    });

    const toggleSection = (section) => {
        setIsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="detail">
            <div className="user">
                <img src="./avatar.png" alt="User Avatar" />
                <h2>Chaulee</h2>
                <p>ditme</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title" onClick={() => toggleSection('chatSettings')}>
                        <span>Chat Settings</span>
                        <img src={isOpen.chatSettings ? "./arrowDown.png" : "./arrowUp.png"} alt="Toggle" />
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
                        <img src={isOpen.privacyHelp ? "./arrowDown.png" : "./arrowUp.png"} alt="Toggle" />
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
                        <img src={isOpen.sharedPhotos ? "./arrowDown.png" : "./arrowUp.png"} alt="Toggle" />
                    </div>
                    {isOpen.sharedPhotos && (
                        <div className="photos">
                            {/* Photos display here */}
                        </div>
                    )}
                </div>
                <div className="option">
                    <div className="title" onClick={() => toggleSection('sharedFiles')}>
                        <span>Shared Files</span>
                        <img src={isOpen.sharedFiles ? "./arrowDown.png" : "./arrowUp.png"} alt="Toggle" />
                    </div>
                </div>
                {isOpen.sharedFiles && (
                    <div>
                        {/* Files display content here */}
                    </div>
                )}
                <button>Block User</button>
                <button className="logout">Logout</button>
            </div>
        </div>
    )
}

export default Detail;
