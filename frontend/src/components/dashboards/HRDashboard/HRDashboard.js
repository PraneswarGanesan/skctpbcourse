// src/components/dashboards/HRDashboard/HRDashboard.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from '../SidePanel';
import Dashboard from './components/Dashboard';
import ManageEmployees from './components/ManageEmployees';
import LeaveRequests from './components/LeaveRequests';
import Profile from './components/Profile';

const HRDashboard = ({ path }) => {
  const renderComponent = () => {
    switch (path) {
      case 'manage-employees':
        return <ManageEmployees />;
      case 'leave-requests':
        return <LeaveRequests />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SidePanel role="hr" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default HRDashboard;
