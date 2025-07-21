import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/Register';
// import other pages like Production, Downtime, etc.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/production" element={<Production />} /> */}
        {/* <Route path="/downtime" element={<Downtime />} /> */}
        {/* <Route path="/defects" element={<DefectRates />} /> */}
        {/* <Route path="/shiftwise" element={<ShiftwiseReport />} /> */}
      </Routes>
    </Router>
  );
  console(React);
}

export default App;