import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainList from './components/TrainList';
import TrainDetails from './components/TrainDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainList />} />
        <Route path="/train/:trainNumber" element={<TrainDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
