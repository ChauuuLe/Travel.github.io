import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatList.css";
import searchIcon from "../../../../assets/search.png";
import AddUser from "./addUser/addUser.jsx";

const ChatList = ({ setChatId }) => {
  const [addMode, setAddMode] = useState(false);
  const [userChats, setUserChats] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://travel-github-io.onrender.com/api/users/${currentUser.id}/chats`, {
          headers: {
            'x-access-token': token,
          },
        });
        setUserChats(response.data);
      } catch (err) {
        console.error('Error fetching chats', err);
      }
    };

    if (currentUser) {
      fetchChats();
    }
  }, [currentUser]);

  const renderAvatar = (avatar) => {
    if (avatar) {
      return avatar;
    }
    return "./assets/avatar.png";
  };

  const renderUserChats = (userChats) => (
    userChats.map((userChat) => {
      return (
        <div key={userChat._id} className="item" onClick={() => setChatId(userChat._id)}>
          <img src={renderAvatar(userChat.lastMessage.sender.avatar)} alt="avatar" />
          <div className="texts">
            <span>{userChat.lastMessage.sender}</span>
            <p>{userChat.lastMessage ? userChat.lastMessage.text : 'No messages yet'}</p>
          </div>
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