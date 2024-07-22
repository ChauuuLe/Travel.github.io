import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./chatList.css";
import searchIcon from "../../../../assets/search.png";
import AddUser from "./addUser/addUser.jsx";

const ChatList = ({ setChatId }) => {
  const navigate = useNavigate();
  const [addMode, setAddMode] = useState(false);
  const [userChats, setUserChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);
  console.log(currentUser);

  useEffect(() => {
    if (currentUser && currentUser.userChats) {
      setUserChats(currentUser.userChats);
    }
  }, [currentUser]);

  const renderAvatarLastMessage = (lastMessage) => {
    if (lastMessage) {
      if (lastMessage.sender.avatar) {
        return avatar;
      }
      return "./assets/avatar.png";
    }
    return "./assets/avatar.png";
  };
  
  const renderLastMessage = (lastMessage) => {
    if (lastMessage) {
      <div className="texts">
          <span>{lastMessage.sender.username}</span>
          <p>{lastMessage ? lastMessage.text : 'No messages yet'}</p>
      </div>
    }
    return (
      <div className="texts">
          <p>{'No messages yet'}</p>
      </div>
    );
  }

  const renderUserChats = (userChats) => (
    userChats.map((userChat) => {
      return (
        <div key={userChat._id} className="item" onClick={() => setChatId(userChat._id)}>
          <div className="texts">
            <p>{userChat.groupName}</p>
          </div>
          <img src={renderAvatarLastMessage(userChat.lastMessage)} alt="avatar" />
          {renderLastMessage(userChat.lastMessage)}
        </div>
      );
    })
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img 
          src={addMode ? "./assets/minus.png" : "./assets/plus.png"} 
          alt="addIcon" 
          className="add" 
          onClick={() => setAddMode((prev) => !prev)} 
        />
      </div>
      <div>
        {renderUserChats(userChats)}
      </div>
      {addMode && <AddUser/>}
    </div>
  );
};

export default ChatList;
