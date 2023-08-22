import React from 'react';
import { Link } from 'react-router-dom';

function TrainCard({ train }) {
  return (
    <Link to={`/train/${train.trainNumber}`}>
      <div>
        <h3>{train.trainName}</h3>
        <p>Train Number: {train.trainNumber}</p>
        <p>
          Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}
        </p>
        <p>Seats Available - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
        <p>Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
        <p>Delayed By: {train.delayedBy} minutes</p>
      </div>
    </Link>
  );
}

export default TrainCard;
