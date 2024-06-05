import React, { useState, useEffect } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage';
import List from './pages/List';
import Chat from './pages/chat/Chat';
import Detail from './pages/detail/Detail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (

    <Routes>
      <Route path="/signin" element={<SignIn setCurrentUser={handleLogin} />} />
      <Route path="/signup" element={<SignUp setCurrentUser={handleLogin} />} />
      <Route path="/" element={<HomePage /> }/>
      <Route path="/list" element={<List /> } />
      <Route path="/chat" element={<Chat /> } />
      <Route path="/detail" element={<Detail /> } />
    </Routes>

  );
};

export default App;
