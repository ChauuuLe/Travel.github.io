import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import List from './pages/List';
import Chat from './pages/chat/Chat';
import Detail from './pages/detail/Detail';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import HotelSearchPage from './pages/hotelsearchpage/HotelSearchPage';
import Navbar from './pages/navbar/navbar';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Check if the current path is sign-in or sign-up
  const hideNavbarPaths = ['/signin', '/signup'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn setCurrentUser={handleLogin} />} />
        <Route path="/signup" element={<SignUp setCurrentUser={handleLogin} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<List />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/hotels" element={<HotelSearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
