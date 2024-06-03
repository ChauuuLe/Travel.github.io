import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import "./assets/style.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn setCurrentUser={setCurrentUser} />} />
      <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
