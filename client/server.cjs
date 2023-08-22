const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Fetch train data from John Doe Railway Server
app.get('/trains', async (req, res) => {
  try {
    // Make a request to the John Doe Railway Server API
    const response = await axios.get('http://20.244.56.144/train/trains', {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3MTEzMzgsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOTBiNTRkM2MtN2IyZi00MjFjLThlYzAtZjgzNmRjYmNmOTU4Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlJBMjAxMTAyODAxMDA4MiJ9.PA7mAbrfycNdmj4sPk0C88Q3rEHgA91KI47MrMe8z7Y`,
      },
    });

    let processedData;

    if (Array.isArray(response.data)) {
      // If the API response is an array
      processedData = response.data.map(apiTrain => ({
        trainName: apiTrain.trainName,
        trainNumber: apiTrain.trainNumber,
        departureTime: {
          Hours: apiTrain.departureTime.Hours,
          Minutes: apiTrain.departureTime.Minutes,
          Seconds: apiTrain.departureTime.Seconds,
        },
        seatsAvailable: {
          sleeper: apiTrain.seatsAvailable.sleeper,
          AC: apiTrain.seatsAvailable.AC,
        },
        price: {
          sleeper: apiTrain.price.sleeper,
          AC: apiTrain.price.AC,
        },
        delayedBy: apiTrain.delayedBy,
      }));
    } else if (typeof response.data === 'object') {
      // If the API response is a single object
      const apiTrain = response.data;
      processedData = {
        trainName: apiTrain.trainName,
        trainNumber: apiTrain.trainNumber,
        departureTime: {
          Hours: apiTrain.departureTime.Hours,
          Minutes: apiTrain.departureTime.Minutes,
          Seconds: apiTrain.departureTime.Seconds,
        },
        seatsAvailable: {
          sleeper: apiTrain.seatsAvailable.sleeper,
          AC: apiTrain.seatsAvailable.AC,
        },
        price: {
          sleeper: apiTrain.price.sleeper,
          AC: apiTrain.price.AC,
        },
        delayedBy: apiTrain.delayedBy,
      };
    } else {
      // Handle other types of responses (if needed)
      processedData = {};
    }

    // Send the processed data as a response
    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
