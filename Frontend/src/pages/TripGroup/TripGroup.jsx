import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "../../Components/chatApp/list/List.jsx";
import Chat from "../../Components/chatApp/chat/Chat.jsx";
import Detail from "../../Components/chatApp/detail/Detail.jsx";
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
      <List setChatId={setChatId} />
      <Chat chatId={chatId} />
    </div>
  );
};

export default TripGroup;
