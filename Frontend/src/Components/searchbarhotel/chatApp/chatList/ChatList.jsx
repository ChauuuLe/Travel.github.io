import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatList.css";
//import AddUser from "./addUser/AddUser";

const ChatList = (props) => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const {
    currentUser,
  } = props;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("/api/chats", {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        });
        setChats(response.data);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, [currentUser]);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="../../assets/search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img 
          src={addMode ? "../../assets/minus.png" : "../../assets/plus.png"} 
          alt="" 
          className="add" 
          onClick={() => setAddMode((prev) => !prev)} 
        />
      </div>
      {chats.map((chat) => (
        <div key={chat._id} className="item">
          <img src="../../assets/avatar.png" alt="" />
          <div className="texts">
            <span>{chat.sender.username}</span>
            <p>{chat.message}</p>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default ChatList;
