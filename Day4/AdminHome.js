// src/components/dashboards/AdminDashboard/AdminHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="admin-home-container">
      <div className="admin-home-content">
        <h2>Welcome, {user ? user.role : 'Admin'}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminHome;
