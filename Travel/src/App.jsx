import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    
      <Route path="/" element={<HomePage />} />
    </Routes>
    
  );
};

export default App;
