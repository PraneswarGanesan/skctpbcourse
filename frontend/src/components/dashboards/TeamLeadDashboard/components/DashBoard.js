// src/components/dashboards/TeamLeadDashboard/components/Dashboard.js
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

// Sample data for tasks and pie chart
const tasksRemaining = 5;
const currentProject = "Project Alpha";
const recentChanges = [
  { id: 1, change: 'Updated task 3', date: '2024-07-25' },
  { id: 2, change: 'Completed task 5', date: '2024-07-24' },
  { id: 3, change: 'Added new task 7', date: '2024-07-23' },
];

const kanbanStats = {
  toDo: 3,
  inProgress: 1,
  done: 1,
};

// Sample data for pie chart
const pieData = [
  { name: 'To Do', value: kanbanStats.toDo },
  { name: 'In Progress', value: kanbanStats.inProgress },
  { name: 'Completed', value: kanbanStats.done },
];

// Colors for pie chart segments
const COLORS = ['#FF9999', '#66B2FF', '#99FF99'];

const StyledCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
});

const CardHeader = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
});

const CardValue = styled(Typography)({
  fontWeight: '600',
  color: '#00796b',
  fontSize: '2rem',
});

const RecentActivity = styled(Box)({
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const ActivityItem = styled(Box)({
  marginBottom: '8px',
  padding: '8px',
  borderBottom: '1px solid #e0e0e0',
});

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TeamLeadSidePanel />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Team Lead Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Tasks Remaining</CardHeader>
                <CardValue variant="h4">{tasksRemaining}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Current Project</CardHeader>
                <CardValue variant="h4">{currentProject}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Task Distribution</Typography>
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
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Changes</Typography>
                <RecentActivity>
                  {recentChanges.map(change => (
                    <ActivityItem key={change.id}>
                      <Typography variant="body1">{change.change}</Typography>
                      <Typography variant="caption" color="textSecondary">{change.date}</Typography>
                    </ActivityItem>
                  ))}
                </RecentActivity>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <StyledCard sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Calendar
          </Typography>
          <Calendar />
        </StyledCard>
      </Box>
    </Box>
  );
};

export default Dashboard;
