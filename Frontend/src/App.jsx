import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import HotelSearchPage from './pages/HotelSearchPage/HotelSearchPage';
import FlightSearchPage from './pages/FlightSearchPage/FlightSearchPage';
import Navbar from '../../Frontend/src/pages/navbar/navbar';
import TripGroup from './pages/TripGroup/TripGroup';
import CreateGroup from './pages/createGroup/createGroup';
import Page1 from './Components/findUsers/findUsers';
import Page2 from './Components/schedule/schedule';
import Page3 from './Components/groupName/groupName';
import UserProfile from '../../Frontend/src/pages/userProfile/userProfile';
import DestinationList from './pages/DestinationList/DestinationList';
import DestinationDetail from './Components/DestinationDetail/DestinationDetail'

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
        <Route path="/creategroup" element={<CreateGroup/>}>
          <Route index element={<Page1/>}/>
          <Route path="/creategroup/findusers" element={<Page1/>}/>
          <Route path="/creategroup/schedule" element={<Page2/>}/>
          <Route path="/creategroup/groupname" element={<Page3/>}/>
        </Route>
        <Route path="/tripgroup" element={<TripGroup />} />
        <Route path="/profile" element={<UserProfile />} /> {/* Add this route */}
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/destinations/:destinationId" element={<DestinationDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
