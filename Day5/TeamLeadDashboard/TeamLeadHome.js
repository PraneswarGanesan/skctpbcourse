// src/components/dashboards/TeamLeadDashboard/TeamLeadHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamLeadHome.css';

const TeamLeadHome = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="team-lead-home-container">
      <div className="team-lead-home-content">
        <h2>Welcome, {user ? user.role : 'Team Lead'}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default TeamLeadHome;
