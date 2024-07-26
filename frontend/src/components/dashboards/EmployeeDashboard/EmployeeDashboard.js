// src/components/dashboards/EmployeeDashboard/EmployeeDashboard.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from '../SidePanel';
import Dashboard from './components/Dashboard';
import MyShifts from './components/MyShifts';
import TimeOff from './components/TimeOff';
import Profile from './components/Profile';

const EmployeeDashboard = ({ path }) => {
  const renderComponent = () => {
    switch (path) {
      case 'my-shifts':
        return <MyShifts />;
      case 'time-off':
        return <TimeOff />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SidePanel role="employee" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
