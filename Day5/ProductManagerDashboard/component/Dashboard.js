// src/components/ProductManagerDashboard/Dashboard.js
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Teams', value: 8 },
  { name: 'Projects', value: 15 },
  { name: 'Completed Projects', value: 5 },
  { name: 'Employees Working', value: 50 },
];

const COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'];

const StyledPaper = styled(Paper)({
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Product Manager Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Statistics Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Team Performance Stats</Typography>
              <Typography variant="body1">Number of teams: 8</Typography>
              <Typography variant="body1">Number of projects: 15</Typography>
              <Typography variant="body1">Number of completed projects: 5</Typography>
              <Typography variant="body1">Number of employees working on projects: 50</Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
