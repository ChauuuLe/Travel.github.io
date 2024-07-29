import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "../../Components/ChatApp/List/List.jsx";
import Chat from "../../Components/ChatApp/Chat/Chat.jsx";
import Detail from "../../Components/ChatApp/Detail/Detail.jsx";
import "./TripGroup.css";

const TripGroup = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(null); 

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container">
      <List setChatId={setChatId} chatId={chatId} />
      <Chat chatId={chatId} setChatId={setChatId} />
    </div>
  );
};

export default TripGroup;
