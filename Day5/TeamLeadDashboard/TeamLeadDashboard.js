import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TeamLeadSidePanel from './TeamLeadSidePanel';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import ManageTeam from './component/ManageTeam';
import Profile from './component/Profile';
import ShiftScheduling from './component/ShiftScheduling';
import TeamLeadHome from './TeamLeadHome';

const TeamLeadDashboard = ({ user }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TeamLeadSidePanel user={user} />
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
          <Route path="home" element={<TeamLeadHome user={user} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-team" element={<ManageTeam />} />
          <Route path="shift-scheduling" element={<ShiftScheduling />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default TeamLeadDashboard;
