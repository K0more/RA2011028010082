import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from './TrainCard';

function TrainList() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://20.244.56.144/train/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Train List</h1>
      {trains.map(train => (
        <TrainCard key={train.trainNumber} train={train} />
      ))}
    </div>
  );
}

export default TrainList;
