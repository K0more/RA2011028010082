import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import axios from 'axios';

function TrainDetails() {
  const { trainNumber } = useParams();
  const [trainDetails, setTrainDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://20.244.56.144/train/trains/${trainNumber}`)
      .then(response => {
        setTrainDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [trainNumber]);

  if (!trainDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{trainDetails.trainName}</h2>
      <p>Train Number: {trainDetails.trainNumber}</p>
      <Outlet />
    </div>
  );
}

export default TrainDetails;
