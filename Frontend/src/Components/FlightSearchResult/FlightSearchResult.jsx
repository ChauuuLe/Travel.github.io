import React from 'react';
import './FlightSearchResult.css';

const FlightSearchResult = ({ results }) => {
    if (results === 'No flights found') {
        return <div className="no-results">No flights found</div>;
    }

    return (
        <div className="flight-search-results">
            {results.map((flight, index) => (
                <div key={index} className="flight-card">
                    <div className="flight-info">
                        <h3>{flight.airline}</h3>
                        <p>{flight.from} to {flight.to}</p>
                        <p>Departure: {flight.departureTime}</p>
                        <p>Arrival: {flight.arrivalTime}</p>
                        <p>Duration: {flight.duration}</p>
                        <p>Price: {flight.price}</p>
                        <p>Nonstop: {flight.nonstop ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlightSearchResult;
