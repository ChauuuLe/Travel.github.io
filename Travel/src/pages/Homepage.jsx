import React from 'react';
import "../assets/style.css";
import Navbar from '../navbar';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="main-content">
        <h1>The Liems</h1>
      </div>
    </div>
  );
};

export default HomePage;
