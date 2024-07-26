import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./chatList.css";
import AddUser from "./addUser/addUser.jsx";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND); // Adjust the backend URL

const ChatList = ({ setChatId, chatId }) => {
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

  const fetchUserChats = async () => {
    if (currentUser) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/userChats`, {
          headers: {
            'x-access-token': token,
          },
        });
        const chats = response.data;
        chats.sort((a, b) => new Date(b.lastMessage?.createdAt || b.createdAt) - new Date(a.lastMessage?.createdAt || a.createdAt));
        setUserChats(chats);
        if (chats.length > 0 && !chatId) {
          setChatId(chats[0]._id);
        }
      } catch (err) {
        console.error('Error fetching user chats', err);
      }
    }
  };

  useEffect(() => {
    fetchUserChats();
  }, [currentUser, setChatId]);

  useEffect(() => {
    socket.on('updateChatList', fetchUserChats);

    return () => {
      socket.off('updateChatList', fetchUserChats);
    };
  }, [fetchUserChats]);

  const renderAvatarLastMessage = (lastMessage) => {
    return lastMessage && lastMessage.sender && lastMessage.sender.avatar
      ? lastMessage.sender.avatar
      : "./assets/avatar.png";
  };

  const renderLastMessage = (lastMessage) => {
    if (lastMessage && lastMessage.sender) {
      const truncatedText = lastMessage.text.length > 20 ? `${lastMessage.text.substring(0, 20)}...` : lastMessage.text;
      return (
        <div className="texts">
          <span>{lastMessage.sender.username}</span>
          <p className="last-message">{truncatedText}</p>
        </div>
      );
    }
    return (
      <div className="texts">
        <p className="last-message">{'No messages yet'}</p>
      </div>
    );
  };

  const renderUserChats = (userChats) => (
    userChats.map((userChat) => (
      <div key={userChat._id} className="item" onClick={() => setChatId(userChat._id)}>
        <div className="texts">
          <p>{userChat.groupName}</p>
        </div>
        <img src={renderAvatarLastMessage(userChat.lastMessage)} alt="avatar" />
        {renderLastMessage(userChat.lastMessage)}
      </div>
    ))
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
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
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
