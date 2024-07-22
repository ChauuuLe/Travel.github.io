import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../../Components/Tab/Tab';
import './DestinationList.css';

const DestinationList = () => {
    const sampleData = {
        destinations: [
            {
                id: "1",
                name: "London",
                image: "/images/london.jpg",
                things_to_do: 2444,
                region: "Europe"
            },
            {
                id: "2",
                name: "Istanbul",
                image: "/images/istanbul.jpg",
                things_to_do: 1616,
                region: "Europe"
            },
            {
                id: "3",
                name: "Paris",
                image: "/images/paris.jpg",
                things_to_do: 2910,
                region: "Europe"
            }
        ]
    };

    const formattedData = sampleData.destinations.reduce((acc, destination) => {
        const region = destination.region || 'Unknown';
        if (!acc[region]) acc[region] = [];
        acc[region].push(destination);
        return acc;
    }, {});

    const [regions, setRegions] = useState(formattedData);
    const [currentRegion, setCurrentRegion] = useState(Object.keys(formattedData)[0] || '');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDestinations = regions[currentRegion]?.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (!regions[currentRegion]) return <div>Loading...</div>;

    return (
        <div className="destinations-list">
            <h1>Destinations</h1>
            <Tabs regions={regions} currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
            <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="destination-cards">
                {filteredDestinations.map(destination => (
                    <Link to={`/destinations/${destination.id}`} key={destination.id}>
                        <div className="destination-card">
                            <img src={destination.image} alt={destination.name} />
                            <h3>{destination.name}</h3>
                            <p>{destination.things_to_do} things to do</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DestinationList;
