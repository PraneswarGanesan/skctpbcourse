// src/components/ProductManagerDashboard/ViewTeamLeadSchedule.js
import React from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

// Sample data for team lead schedule
const teamLeadSchedule = [
  { id: 1, name: 'John Doe', schedule: '9:00 AM - 5:00 PM' },
  { id: 2, name: 'Jane Smith', schedule: '10:00 AM - 6:00 PM' },
  { id: 3, name: 'Emily Johnson', schedule: '8:00 AM - 4:00 PM' },
];

const ViewTeamLeadSchedule = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          View Team Lead Schedule
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Team Lead Schedules</Typography>
          <List>
            {teamLeadSchedule.map(schedule => (
              <ListItem key={schedule.id}>
                <ListItemText
                  primary={`${schedule.name}`}
                  secondary={`Schedule: ${schedule.schedule}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default ViewTeamLeadSchedule;
