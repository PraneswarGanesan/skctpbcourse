import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'HR Employees', value: 20 },
  { name: 'Product Managers', value: 10 },
  { name: 'Employees', value: 60 },
  { name: 'Team Leads', value: 30 },
];

const COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'];

const stats = {
  totalUsers: 120,
  activeShifts: 35,
  upcomingEvents: 10,
};

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

const DashBoard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Total Users</CardHeader>
                <CardValue variant="h4">{stats.totalUsers}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Active Shifts</CardHeader>
                <CardValue variant="h4">{stats.activeShifts}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <CardHeader variant="h6">Upcoming Events</CardHeader>
                <CardValue variant="h4">{stats.upcomingEvents}</CardValue>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Distribution of Users</Typography>
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
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <RecentActivity>
                  <ActivityItem>New user registered: John Doe</ActivityItem>
                  <ActivityItem>Shift created: Morning shift for Aug 1</ActivityItem>
                  <ActivityItem>Time-off request approved: Jane Smith</ActivityItem>
                  <ActivityItem>Upcoming event: Company meeting on Aug 5</ActivityItem>
                </RecentActivity>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashBoard;
