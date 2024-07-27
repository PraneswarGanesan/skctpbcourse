// src/components/dashboards/EmployeeDashboard/components/MyShifts.js
import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import SidePanel from '../EmployeeSidePanel';

const shifts = [
  { id: 1, date: '2024-08-01', time: '9:00 AM - 5:00 PM', role: 'Developer' },
  { id: 2, date: '2024-08-02', time: '10:00 AM - 6:00 PM', role: 'Tester' },
  { id: 3, date: '2024-08-03', time: '11:00 AM - 7:00 PM', role: 'Support' },
];

const MyShifts = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          My Shifts
        </Typography>
        <Divider sx={{ my: 2 }} />
        {shifts.map((shift) => (
          <Paper key={shift.id} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">{shift.date}</Typography>
            <Typography variant="body1">{shift.time}</Typography>
            <Typography variant="body2" color="textSecondary">
              Role: {shift.role}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MyShifts;
