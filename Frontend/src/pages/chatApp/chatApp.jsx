import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Navbar from "../navbar/navbar.jsx";
import "./chatApp.css"

const chatApp = (props) => {
  const {
    currentUser,
  } = window.global;

  return (
    <>
      {showNavbar && <Navbar />}
      {currentUser ? (
        <div className="container">
          <List />
          <Chat />
          <Detail />
        </div>
        ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};