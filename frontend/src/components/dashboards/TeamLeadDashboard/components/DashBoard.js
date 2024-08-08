import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

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

const COLORS = ['#FF9999', '#66B2FF', '#99FF99'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [recentChanges, setRecentChanges] = useState([]);
  const [currentProject, setCurrentProject] = useState('');
  const [teamMembers, setTeamMembers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all tasks
        const tasksResponse = await axios.get('http://localhost:8080/api/employeetasks/all');
        setTasks(tasksResponse.data);

        // Fetch recent changes (assuming an API endpoint exists)
        // For demo purposes, using static recent changes
        setRecentChanges(recentChanges);

        // Fetch current project and team members
        const currentUser = JSON.parse(localStorage.getItem('teamLead')); // Assuming the team lead info is stored in localStorage
        const projectResponse = await axios.get(`http://localhost:8080/api/teams/${currentUser.teamId}`);
        const projectData = projectResponse.data;
        setCurrentProject(projectData.project.name);
        setTeamMembers(projectData.memberUsernames.length);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate task distribution for the pie chart
  const kanbanStats = {
    toDo: tasks.filter(task => task.status === 'Not Started').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    done: tasks.filter(task => task.status === 'Completed').length,
  };

  const pieData = [
    { name: 'To Do', value: kanbanStats.toDo },
    { name: 'In Progress', value: kanbanStats.inProgress },
    { name: 'Completed', value: kanbanStats.done },
  ];

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
                <CardHeader variant="h6">Team Members</CardHeader>
                <CardValue variant="h4">{teamMembers}</CardValue>
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
                  {recentChanges.slice(0, 5).map(change => (
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
