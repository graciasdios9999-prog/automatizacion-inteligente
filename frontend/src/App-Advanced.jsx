import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdvancedDashboard from './pages/Dashboard-Advanced';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdvancedDashboard />} />
        <Route path="/" element={<AdvancedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;