import React from 'react';
import "../Homepage/Homepage.css";
import Navbar from '../navbar/navbar';
import video from '../../../../Backend (server and db)/app/assets/images/video.mp4'

const HomePage = () => {
  return (
    <div className="homepage">

      <video src={video} muted autoPlay loop type="video/mp4"></video>
      <Navbar/>
      <div className="main-content">
      </div>
    </div>
  );
};

export default HomePage;
