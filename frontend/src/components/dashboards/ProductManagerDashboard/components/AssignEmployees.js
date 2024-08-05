import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import ProductManagerSidePanel from '../ProductManagerSidePanel';

const AssignEmployees = () => {
  const [teamName, setTeamName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch team leads
    axios.get('http://localhost:8080/api/teams/users/team_lead')
      .then(response => {
        console.log('Fetched team leads:', response.data);
        setTeamLeads(response.data);
      })
      .catch(error => console.error('Error fetching team leads', error));

    // Fetch employees
    axios.get('http://localhost:8080/api/teams/users/employee')
      .then(response => {
        console.log('Fetched employees:', response.data);
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees', error));

    // Fetch projects
    axios.get('http://localhost:8080/api/projects/allprojects')
      .then(response => {
        console.log('Fetched projects:', response.data);
        setProjects(response.data);
      })
      .catch(error => console.error('Error fetching projects', error));

    // Fetch teams
    axios.get('http://localhost:8080/api/teams')
      .then(response => {
        console.log('Fetched teams:', response.data);
        setTeams(response.data);
      })
      .catch(error => console.error('Error fetching teams', error));
  }, []);

  const handleCreateTeam = () => {
    axios.post('http://localhost:8080/api/teams', {
      name: teamName,
      leadId: selectedTeamLead ? selectedTeamLead.id : null,
      memberIds: selectedEmployees.map(emp => emp.id),
      project: { id: selectedProject }
    })
    .then(response => {
      alert('Team created successfully');
      setTeamName('');
      setSelectedProject('');
      setSelectedEmployees([]);
      setSelectedTeamLead(null);
      setTeams([...teams, response.data]);
    })
    .catch(error => {
      console.error('There was an error creating the team!', error);
    });
  };

  const handleDeleteTeam = (teamId) => {
    axios.delete(`http://localhost:8080/api/teams/${teamId}`)
      .then(() => {
        alert('Team deleted successfully');
        setTeams(teams.filter(team => team.id !== teamId));
      })
      .catch(error => {
        console.error('There was an error deleting the team!', error);
      });
  };

  return (
    <div>
      <ProductManagerSidePanel />
      <Container>
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Assign Employees
          </Typography>
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <TextField
            select
            label="Project"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map(project => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Select Team Lead
          </Typography>
          {teamLeads.map(teamLead => (
            <FormControlLabel
              key={teamLead.id}
              control={
                <Checkbox
                  checked={selectedTeamLead?.id === teamLead.id}
                  onChange={() => setSelectedTeamLead(selectedTeamLead?.id === teamLead.id ? null : teamLead)}
                />
              }
              label={teamLead.username}
            />
          ))}
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Select Employees
          </Typography>
          {employees.map(employee => (
            <FormControlLabel
              key={employee.id}
              control={
                <Checkbox
                  checked={selectedEmployees.some(emp => emp.id === employee.id)}
                  onChange={() => {
                    setSelectedEmployees(prevSelected =>
                      prevSelected.some(emp => emp.id === employee.id)
                        ? prevSelected.filter(emp => emp.id !== employee.id)
                        : [...prevSelected, employee]
                    );
                  }}
                />
              }
              label={employee.username}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeam}
            style={{ marginTop: '20px' }}
          >
            Assign Team
          </Button>
          <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
            Created Teams
          </Typography>
          {teams.map(team => (
            <Paper key={team.id} style={{ padding: '10px', margin: '10px 0' }}>
              <Typography variant="h6">{team.name}</Typography>
              <Typography>Team Lead: {team.leadUsername}</Typography>
              <Typography>
                Members: {team.memberUsernames.length > 0 ? team.memberUsernames.join(', ') : 'No members assigned'}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteTeam(team.id)}
                style={{ marginTop: '10px' }}
              >
                Delete
              </Button>
            </Paper>
          ))}
        </Paper>
      </Container>
    </div>
  );
};

export default AssignEmployees;
