import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductManagerSidePanel from './ProductManagerSidePanel';
import Dashboard from './component/Dashboard';
import AssignEmployees from './component/AssignEmployees';
import ViewTeamLeadSchedule from './component/ViewTeamLeadSchedule';
import CreateProjects from './component/CreateProjects';
import Profile from './component/Profile';
import ProductManagerHome from './ProductManagerHome';

const ProductManagerDashboard = ({ user }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ProductManagerSidePanel user={user} />
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
          <Route path="home" element={<ProductManagerHome user={user} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assign-employees" element={<AssignEmployees />} />
          <Route path="view-team-lead-schedule" element={<ViewTeamLeadSchedule />} />
          <Route path="create-projects" element={<CreateProjects />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ProductManagerDashboard;
