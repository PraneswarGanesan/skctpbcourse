import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeSidePanel from './EmployeeSidePanel';
import EmployeeHome from './EmployeeHome';
import Dashboard from './component/Dashboard';
import Message from './component/Message';
import Profile from './component/Profile';
import MyShifts from './component/MyShifts';
import TimeOff from './component/TimeOff';

const EmployeeDashboard = ({ user }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <EmployeeSidePanel user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '',
          p: 3,
        }}
        >
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="home" element={<EmployeeHome user={user} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="message" element={<Message />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-shifts" element={<MyShifts />} />
          <Route path="time-off" element={<TimeOff />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
