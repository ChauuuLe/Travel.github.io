import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import "./chatApp.css";

const chatApp = () => {
  const currentUser = window.gon.currentUser;
  
  const renderChat = () => {
    if (currentUser) {
      return (
        <div className="container">
          <List />
          <Chat />
          <Detail />
        </div>
      );
    }
    else {
      <Redirect to="/login" />
    }
  }
  return (
    <>
      {renderChat()}
    </>
  );
};

export default chatApp;