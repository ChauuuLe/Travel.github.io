import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../../Components/Tab/Tab';
import './DestinationList.css';

const DestinationList = () => {
    const sampleData = [
        {
            id: "1",
            name: "London",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/London_Montage_L.jpg",
            region: "Europe",
            things_to_do: 2444
        },
        {
            id: "2",
            name: "Istanbul",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Istanbul_collage.jpg",
            region: "Europe",
            things_to_do: 1616
        },
        {
            id: "3",
            name: "Paris",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Paris_Night.jpg",
            region: "Europe",
            things_to_do: 2910
        },
        {
            id: "4",
            name: "Tokyo",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tokyo_Tower_and_surrounding.jpg",
            region: "Asia",
            things_to_do: 3150
        },
        {
            id: "5",
            name: "Sydney",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Opera_House_Sails.jpg",
            region: "Australia",
            things_to_do: 2780
        },
        {
            id: "6",
            name: "New York",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/NYC_skyline_and_Central_Park.jpg",
            region: "North America",
            things_to_do: 3890
        }
    ];

    const [destinations, setDestinations] = useState([]);
    const [formattedData, setFormattedData] = useState({});
    const [currentRegion, setCurrentRegion] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [newDestination, setNewDestination] = useState({
        name: '',
        image: '',
        region: '',
        things_to_do: ''
    });

    useEffect(() => {
        const formatData = () => {
            const formatted = sampleData.reduce((acc, destination) => {
                const region = destination.region || 'Unknown';
                if (!acc[region]) {
                    acc[region] = [];
                }
                acc[region].push(destination);
                return acc;
            }, {});

            setDestinations(sampleData);
            setFormattedData(formatted);
            setCurrentRegion(Object.keys(formatted)[0] || '');
        };

        formatData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreateButtonClick = () => {
        setIsCreating(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDestination(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newId = (destinations.length + 1).toString();
        const createdDestination = { ...newDestination, id: newId };

        setDestinations(prevDestinations => [...prevDestinations, createdDestination]);
        setFormattedData(prevFormattedData => {
            const region = createdDestination.region || 'Unknown';
            if (!prevFormattedData[region]) {
                prevFormattedData[region] = [];
            }
            return {
                ...prevFormattedData,
                [region]: [...prevFormattedData[region], createdDestination]
            };
        });
        setIsCreating(false);
        setNewDestination({
            name: '',
            image: '',
            region: '',
            things_to_do: ''
        });
    };

    const filteredDestinations = formattedData[currentRegion]?.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (!formattedData[currentRegion]) return <div>Loading...</div>;

    return (
        <div className="destinations-list">
            <h1>Destinations</h1>
            <Tabs regions={formattedData} currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
            <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleCreateButtonClick}>Create New Destination</button>
            {isCreating && (
                <form onSubmit={handleFormSubmit} className="create-destination-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newDestination.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={newDestination.image}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="region"
                        placeholder="Region"
                        value={newDestination.region}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="things_to_do"
                        placeholder="Things to do"
                        value={newDestination.things_to_do}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Create</button>
                </form>
            )}
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
