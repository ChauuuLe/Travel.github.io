import React, { useState, useRef, useEffect } from 'react';
import PaymentModal from '../PaymentModal/PaymentModal';
import './FlightSearchResult.css';

const FlightSearchResult = ({ results }) => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRefs = useRef([]);

    const handleCardClick = (index) => {
        setExpandedCardIndex(index === expandedCardIndex ? null : index);
    };

    useEffect(() => {
        if (expandedCardIndex !== null && cardRefs.current[expandedCardIndex]) {
            cardRefs.current[expandedCardIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }, [expandedCardIndex]);

    const handlePayClick = (flight) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (results === 'No flights found') {
        return <div className="no-results">No flights found</div>;
    }

    return (
        <div className="flight-search-results">
            {results.map((flight, index) => (
                <div
                    key={index}
                    className={`flight-card ${expandedCardIndex === index ? 'expanded' : ''}`}
                    onClick={() => handleCardClick(index)}
                    ref={el => cardRefs.current[index] = el}
                >
                    <div className="flight-info">
                        <div className="airline-logo-container">
                            <img src={flight.logo} alt={flight.airline} className="airline-logo" />
                        </div>
                        <div className="flight-details">
                            <div className="flight-times">
                                <span>{flight.departureTime}</span>
                                <div className="line"></div>
                                <span>{flight.arrivalTime}</span>
                                <span className="duration">{flight.duration}</span>
                            </div>
                            <div className="flight-route">
                                <span>{flight.from} T1</span>
                                <span>{flight.to} T2</span>
                            </div>
                        </div>
                        <div className="price-info">
                            <span className="flight-price">Price: ${flight.price}</span>
                        </div>
                    </div>
                    {expandedCardIndex === index && (
                        <div className="expanded-info">
                            <div className="expanded-details">
                                <div className="detail">
                                    <span>{flight.departureTime} - {flight.arrivalTime}</span>
                                    <span className="label">Flight Time</span>
                                </div>
                                <div className="detail">
                                    <span>{flight.duration}</span>
                                    <span className="label">Duration</span>
                                </div>
                                <div className="detail">
                                    <span>5:35</span>
                                    <span className="label">Boarding</span>
                                </div>
                                <div className="detail">
                                    <span>No</span>
                                    <span className="label">Transfer</span>
                                </div>
                                <div className="detail">
                                    <span>8</span>
                                    <span className="label">Gate</span>
                                </div>
                                <div className="detail">
                                    <span>20A</span>
                                    <span className="label">Seat</span>
                                </div>
                            </div>
                            <div className="price-info">
                                <div className="price-detail">
                                    <span>${flight.price}</span>
                                    <span className="label">Price</span>
                                </div>
                                <div className="price-detail">
                                    <span>Economy</span>
                                    <span className="label">Class</span>
                                </div>
                            </div>
                            <button className="pay-button" onClick={() => handlePayClick(flight)}>Pay</button>
                        </div>
                    )}
                </div>
            ))}
            <PaymentModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                flight={selectedFlight}
            />
        </div>
    );
};

export default FlightSearchResult;
