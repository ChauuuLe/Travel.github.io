import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/destinations/${destinationId}`);
        setDestination(response.data);
      } catch (error) {
        console.error(`Error fetching detailed destination`, error);
      }
    };
    fetchDestination();
  }, [destinationId]);
  console.log(destination);
  if (!destination) return null;

  return (
    <div className="destination-detail">
      <h1>{destination.name}</h1>
      <h2>{destination.country}</h2>
      <h2>{destination.city}</h2>
      <p>{destination.description}</p>
      <h2>Activities</h2>
      <ul>
        {destination.activities.map(activity => (
          <div key={activity._id}>
            <li>
              <img src={activity.image} alt={activity.name} />
            </li>
            <li>
              {activity.name} - ${activity.cost}
            </li>  
          </div>
        ))}
      </ul>
      <p>Average cost: ${destination.averageCost}</p>
      <p>Author: {destination.author.username}</p>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default DestinationDetail;