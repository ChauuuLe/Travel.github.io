import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import HotelSearchPage from '../src/pages/hotelsearchpage/HotelSearchPage';
import FlightSearchPage from '../src/pages/flightsearchpage/flightSearchPage';
import Navbar from '../../Frontend/src/pages/navbar/navbar';
import TripGroup from './pages/TripGroup/TripGroup';
import CreateGroup from './pages/createGroup/createGroup';
import Page1 from './Components/findUsers/findUsers';
import UserProfile from '../../Frontend/src/pages/userProfile/userProfile';
import Destination from '../../Frontend/src/pages/destination/Destination';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/flight" element={<FlightSearchPage />} />
        <Route path="/hotels" element={<HotelSearchPage />} />
        <Route path="/destinations" element={<Destination />} />
        <Route path="/creategroup" element={<CreateGroup />}>
          <Route index element={<Page1 />} />
          <Route path="/creategroup/findusers" element={<Page1 />} />
        </Route>
        <Route path="/tripgroup" element={<TripGroup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
