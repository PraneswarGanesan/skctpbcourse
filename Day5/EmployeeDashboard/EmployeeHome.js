// src/components/dashboards/AdminDashboard/AdminHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeHome.css';

const EmployeeHome = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="employee-home-container">
      <div className="employee-home-content">
        <h2>Welcome, {user ? user.role : 'Employee'}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default EmployeeHome;
