import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Verify from './component/Verify';
import { Toaster } from 'react-hot-toast';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/app" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;