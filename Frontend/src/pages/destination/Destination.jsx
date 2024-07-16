import React from 'react';
import './Destination.css';

const Destination = () => {
    return (
        <div className="destination-page">
            <div className="destination-banner">
                <img src="/path/to/banner-image.jpg" alt="Navagio Beach" className="banner-image" />
                <div className="banner-content">
                    <div className="hot-places">Hot Places</div>
                    <h1 className="destination-title">Navagio Beach</h1>
                    <div className="destination-details">
                        <div className="detail-item">
                            <span className="detail-price">$620</span>
                            <span>7 Days Tour on 2 person</span>
                        </div>
                        <div className="detail-item">
                            <span>5 Star Hotel</span>
                            <span>Hotels to choice</span>
                        </div>
                        <div className="detail-item">
                            <span>Flight date</span>
                            <span>17 September or later</span>
                        </div>
                    </div>
                    <button className="book-now-button">Book Now</button>
                    <div className="video-play-button">
                        <i className="fa fa-play-circle"></i>
                    </div>
                    <div className="navigation-arrows">
                        <div className="arrow-left">&lt;</div>
                        <div className="arrow-right">&gt;</div>
                    </div>
                    <div className="social-media-links">
                        <i className="fa fa-facebook"></i>
                        <i className="fa fa-twitter"></i>
                        <i className="fa fa-instagram"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;
