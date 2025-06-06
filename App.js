import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';  // Import Profile component
import AddEvent from './pages/AddEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/Profile/:userID" element={<Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
