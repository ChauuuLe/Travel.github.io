import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './DestinationDetail.css';

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(null);
    const [activities, setActivities] = useState([]);
    const [averageCost, setAverageCost] = useState(0);

    useEffect(() => {   
        const sampleData = {
            destinations: [
                {
                    id: "1",
                    name: "London",
                    description: "The capital city of the United Kingdom.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/London_Montage_L.jpg",
                    region: "Europe",
                    activities: [
                        { id: "a1", name: "London Eye", cost: 30 },
                        { id: "a2", name: "British Museum", cost: 20 }
                    ],
                    averageCost: 25
                },
                {
                    id: "2",
                    name: "Istanbul",
                    description: "A major city in Turkey.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Istanbul_collage.jpg",
                    region: "Europe",
                    activities: [
                        { id: "a1", name: "Hagia Sophia", cost: 15 },
                        { id: "a2", name: "Basilica Cistern", cost: 10 }
                    ],
                    averageCost: 12.5
                },
                {
                    id: "3",
                    name: "Paris",
                    description: "The capital city of France.",
                    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Paris_Night.jpg",
                    region: "Europe",
                    activities: [
                        { id: "a1", name: "Eiffel Tower", cost: 25 },
                        { id: "a2", name: "Louvre Museum", cost: 15 }
                    ],
                    averageCost: 20
                }
                // Add more destinations as needed...
            ]
        };

        const destinationData = sampleData.destinations.find(dest => dest.id === id);
        if (destinationData) {
            setDestination(destinationData);
            setActivities(destinationData.activities);
            setAverageCost(destinationData.averageCost);
        }
    }, [id]);

    const handleExploreMore = () => {
        const destinationName = destination.name.toLowerCase().replace(/\s+/g, '-');
        const bookingUrl = `https://www.booking.com/attractions/searchresults/${destination.region.toLowerCase().replace(/\s+/g, '-')}/${destinationName}.en-gb.html`;
        window.open(bookingUrl, '_blank');
    };

    if (!destination) return <div>Loading...</div>;

    return (
        <div className="destination-detail">
            <h1>{destination.name}</h1>
            <img src={destination.image} alt={destination.name} />
            <p>{destination.description}</p>
            <h2>Activities</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        {activity.name} - ${activity.cost}
                    </li>
                ))}
            </ul>
            <p>Average cost: ${averageCost}</p>
            <button className="explore-more" onClick={handleExploreMore}>Explore More</button>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default DestinationDetail;
