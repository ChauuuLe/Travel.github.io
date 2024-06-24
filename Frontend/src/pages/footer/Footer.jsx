import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>Explore the world with us. We provide the best travel experiences with personalized services and great deals.</p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#destinations">Destinations</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i className="fas fa-map-marker-alt"></i> Hanoi</li>
                        <li><i className="fas fa-phone"></i> +84 123456789</li>
                        <li><i className="fas fa-envelope"></i> thetravel@travel.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Travel Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
