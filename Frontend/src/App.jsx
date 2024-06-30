import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import HotelSearchPage from './pages/hotelsearchpage/HotelSearchPage';
import FlightSearchPage from './pages/flightsearchpage/flightSearchPage';
import Navbar from './pages/navbar/navbar';
import TripGroup from './pages/TripGroup/TripGroup';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/flight" element={<FlightSearchPage />} />
        <Route path="/hotels" element={<HotelSearchPage />} />
        <Route path="/tripgroup" element={<TripGroup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
