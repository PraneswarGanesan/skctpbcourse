// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/contact';
import AdminDashboard from './components/dashboards/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard/EmployeeDashboard';
import HRDashboard from './components/dashboards/HRDashboard/HRDashboard';
import TeamLeadDashboard from './components/dashboards/TeamLeadDashboard/TeamLeadDashboard';

const DashboardWrapper = ({ Component }) => {
  const { path } = useParams();
  console.log('DashboardWrapper path:', path); // Log the path to debug
  return <Component path={path} />;
};

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin-dashboard/:path" element={user?.role === 'admin' ? <DashboardWrapper Component={AdminDashboard} /> : <Navigate to="/login" />} />
        <Route path="/employee-dashboard/:path" element={user?.role === 'employee' ? <DashboardWrapper Component={EmployeeDashboard} /> : <Navigate to="/login" />} />
        <Route path="/hr-dashboard/:path" element={user?.role === 'hr' ? <DashboardWrapper Component={HRDashboard} /> : <Navigate to="/login" />} />
        <Route path="/team-lead-dashboard/:path" element={user?.role === 'team_lead' ? <DashboardWrapper Component={TeamLeadDashboard} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
