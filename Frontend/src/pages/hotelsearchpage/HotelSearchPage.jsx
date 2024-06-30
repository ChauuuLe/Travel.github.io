import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import SearchBar from '../../Components/searchbar/searchbarhotel';
import Footer from '../footer/Footer';
import videoBg from '../../assets/video.mp4';
import './HotelSearchPage.css';
import spain from '../../assets/spain.jpg';
import italy from '../../assets/italy.jpg';
import france from '../../assets/france.jpg';
import german from '../../assets/german.jpg';

const suggestions = [
    'Ho Chi Minh City',
    'Hanoi',
    'Da Nang',
    'Nha Trang',
    'Vung Tau',
    'Singapore',
    'Seoul',
    'Bangkok'
];

const HomeSearchPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const target = document.querySelector('.content-section');

            if (target) {
                const targetTop = target.offsetTop;
                const targetHeight = target.offsetHeight;

                if (scrollTop > targetTop - window.innerHeight + targetHeight / 2) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const exploreDestinations = [
        {
            image: spain,
            name: 'Spain',
            rentals: 166514
        },
        {
            image: italy,
            name: 'Italy',
            rentals: 179454
        },
        {
            image: france,
            name: 'France',
            rentals: 150123
        },
        {
            image: german,
            name: 'Germany',
            rentals: 143256
        }
    ];



    return (
        <div className="homepage">
            <Navbar />
            <div className="video-section">
                <video src={videoBg} className="background-video" muted autoPlay loop type="video/mp4"></video>
                <div className="overlay"></div>
                <div className="search-bar-container">
                    <SearchBar suggestions={suggestions} />
                </div>
            </div>
            <div className={`content-section ${isVisible ? 'slide-in active' : 'slide-in'}`}>
                <h2>Feel at home wherever you go</h2>
                <div className="explore-destinations">
                    {exploreDestinations.map((destination, index) => (
                        <div className="destination-card" key={index}>
                            <img src={destination.image} alt={destination.name} />
                            <div className="destination-info">
                                <h3>{destination.name}</h3>
                                <p>{destination.rentals} holiday rentals</p>
                                <button className="explore-button">Explore</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeSearchPage;
