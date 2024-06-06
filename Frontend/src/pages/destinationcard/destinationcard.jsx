import React from 'react';
import "../destinationcard/destinationcard.css";

const DestinationCard = ({
    image, title, description, price

}) => {
    return (<div className="destination-card" > <img src={
        image
    }

        alt={
            title
        }

    /> <h3> {
        title
    }

        </h3> <p> {
            description
        }

        </p> <div className="price" >$ {
            price
        }

        </div> <a href="#" className="book-btn" >Book Now</a> </div>);
}

    ;

export default DestinationCard;