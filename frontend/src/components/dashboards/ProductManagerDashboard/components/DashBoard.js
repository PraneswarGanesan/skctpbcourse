import React, { useState, useEffect } from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StyledPaper = styled(Paper)({
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsResponse, projectsResponse, teamLeadsResponse, employeesResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/teams'),
          axios.get('http://localhost:8080/api/teams/projects'),
          axios.get('http://localhost:8080/api/teams/users/team_lead'),
          axios.get('http://localhost:8080/api/teams/users/employee')
        ]);

        setTeams(teamsResponse.data);
        setProjects(projectsResponse.data);
        setTeamLeads(teamLeadsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const numberOfTeams = teams.length;
  const numberOfProjects = projects.length;
  const numberOfCompletedProjects = projects.filter(p => p.completed).length;
  const numberOfEmployeesWorking = employees.length;

  const pieData = projects.map(project => ({
    name: project.name,
    value: 1  // Assuming each project counts as one item
  }));

  const COLORS = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'];

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Product Manager Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Project Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          return (
                            <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                              <p>{payload[0].payload.name}</p> {/* Display project name */}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Team Performance Stats</Typography>
              <Typography variant="body1">Number of teams: {numberOfTeams}</Typography>
              <Typography variant="body1">Number of projects: {numberOfProjects}</Typography>
              <Typography variant="body1">Number of completed projects: {numberOfCompletedProjects}</Typography>
              <Typography variant="body1">Number of employees working on projects: {numberOfEmployeesWorking}</Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
