import React from 'react';
import NewLogo from '../../assets/Capture.png'; 
import './FlightSearchResult.css';

const FlightSearchResult = ({ results }) => {
  return (
    <div className="FlightSearchResult">
      {results.length === 0 ? (
        <p className="no-results-message">Try to find your flights</p>
      ) : (
        results.map((result, index) => (
          <div key={index} className="flight-card">
            <div className="flight-header">
              <img src={NewLogo} alt="Flight Logo" className="airline-logo" /> 
              <div className="flight-info">
                <div className="flight-date">
                  <span>{new Date(result.flights[0].departure_airport.time).toDateString()}</span>
                  <span>{result.total_duration} mins <strong>Total</strong> </span>
                </div>
                <div className="flight-carbon">
                  <span>{(result.carbon_emissions.this_flight / 1000).toFixed(2)} kg CO₂</span>
                  <span>{result.carbon_emissions.difference_percent}% emissions</span>
                </div>
              </div>
              <div className="flight-price">
                <span>${result.price}</span>
              </div>
            </div>
            <div className="flight-segments">
              {result.flights.map((flight, index) => (
                <div key={index} className="flight-segment">
                  <img src={flight.airline_logo} alt="Airline Logo" className="airline-logo" />
                  <div className="flight-time">
                    <span>{new Date(flight.departure_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="time-between">Travel time: {Math.floor(flight.duration / 60)} hr {flight.duration % 60} min</span>
                    <span>{new Date(flight.arrival_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flight-route">
                    <div className="flight-departure">
                      <strong> {flight.departure_airport.name} ({flight.departure_airport.id})</strong>
                    </div>
                    <div className="flight-go">
                      <div className="go-start"></div>
                      <div className="go-dots"></div>
                      <div className="go-end"></div>
                    </div>
                    
                    <div className="flight-arrival">
                      <strong> {flight.arrival_airport.name} ({flight.arrival_airport.id})</strong>
                    </div>
                  </div>
                  <div className="flight-details">
                    <span>{flight.airplane} - {flight.travel_class} - Flight {flight.flight_number}</span>
                    {flight.overnight && <span className="overnight">Overnight flight</span>}
                    {flight.extensions.map((ext, idx) => <span key={idx} className="flight-extension">{ext}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flight-layovers">
              {result.layovers.map((layover, i) => (
                <div key={i} className="layover-info">
                  <span>{layover.duration} min layover at {layover.name} ({layover.id})</span>
                  {layover.overnight && <span className="overnight">Overnight layover</span>}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightSearchResult;
