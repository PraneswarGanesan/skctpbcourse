// src/components/dashboards/AdminDashboard/AdminDashboard.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from '../SidePanel';
import Category from './components/Category';
import Profile from './components/Profile';
import Message from './components/Message';
import Dashboard from './components/DashBoard';
import ManageUsers from './components/ManageUsers';

const AdminDashboard = ({ path }) => {
  console.log('AdminDashboard path:', path); // Log the path to debug

  const renderComponent = () => {
    switch (path) {
      case 'manage-user':
        return <ManageUsers />;
      case 'category':
        return <Category />;
      case 'message':
        return <Message />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SidePanel role="admin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderComponent()}
      </Box>
      <h1>dashboard</h1>
    </Box>
  );
};

export default AdminDashboard;
