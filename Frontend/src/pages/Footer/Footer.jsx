import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>Explore the world with us. We provide the best travel experiences with personalized services and great deals.</p>
                    <div className="socials">
                        <a href="https://www.facebook.com/vuanh.bon.7/"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/le-chau-51148726b/"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://github.com/ChauuuLe"><i className="fab fa-github"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/destinations">Destinations</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="https://www.linkedin.com/in/le-chau-51148726b/">Contact</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#blog">Blog</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i className="fas fa-map-marker-alt"></i> National University of Singapore</li>
                        <li><i className="fas fa-phone"></i> +65 9052 9997</li>
                        <li><i className="fas fa-envelope"></i> lehuychau130105@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Travel Website. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
