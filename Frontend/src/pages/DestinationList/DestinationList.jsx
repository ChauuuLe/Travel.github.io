import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from '../../Components/Tab/Tab';
import './DestinationList.css';

const DestinationList = () => {
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
        // Fetch destinations from the backend using Axios
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('/api/destinations');
                const data = response.data;

                // Format the data as needed
                const formatted = data.reduce((acc, destination) => {
                    const region = destination.region || 'Unknown';
                    if (!acc[region]) {
                        acc[region] = [];
                    }
                    acc[region].push(destination);
                    return acc;
                }, {});

                setDestinations(data);
                setFormattedData(formatted);
                setCurrentRegion(Object.keys(formatted)[0] || '');
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const authorId = 'your-author-id'; // Replace with actual author ID, e.g., from logged-in user context
            const response = await axios.post('/api/destinations', { ...newDestination, authorId });
            const createdDestination = response.data;

            // Update the state with the new destination
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
        } catch (error) {
            console.error('Error creating destination:', error);
        }
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
