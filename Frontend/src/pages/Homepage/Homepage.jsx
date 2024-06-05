import React from 'react';
import "../Homepage/Homepage.css";
import Navbar from '../navbar/navbar';
import video from '../../../../Backend (server and db)/app/assets/images/video.mp4';

const HomePage = () => {
  return (
    <section className="homepage">
      <Navbar />
      <div className='overlay'></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>
      <div className='homeContent container'>
        <div className='textDiv'>
          <span className='smallText'>Choose Your Place</span>
          <h1 className='homeTitle'>Search your Holiday</h1>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
