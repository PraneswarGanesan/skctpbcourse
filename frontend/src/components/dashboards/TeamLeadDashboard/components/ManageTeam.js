// src/components/dashboards/TeamLeadDashboard/components/ManageTeam.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

const ManageTeam = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TeamLeadSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Manage Team
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
};

export default ManageTeam;
