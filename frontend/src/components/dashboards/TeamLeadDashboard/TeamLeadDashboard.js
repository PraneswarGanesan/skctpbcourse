// src/components/dashboards/TeamLeadDashboard/TeamLeadDashboard.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from '../SidePanel';
import Dashboard from './components/DashBoard';
import ManageTeam from './components/ManageTeam';
import ShiftScheduling from './components/ShiftScheduling';
import Profile from './components/Profile';

const TeamLeadDashboard = ({ path }) => {
  const renderComponent = () => {
    switch (path) {
      case 'manage-team':
        return <ManageTeam />;
      case 'shift-scheduling':
        return <ShiftScheduling />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SidePanel role="team_lead" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default TeamLeadDashboard;
