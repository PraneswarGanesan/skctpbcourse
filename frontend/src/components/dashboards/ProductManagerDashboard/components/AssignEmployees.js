import React, { useState } from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, Grid, TextField, Button, List, ListItem, ListItemText, MenuItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const assignedEmployees = [
  { id: 1, name: 'Alice Johnson', project: 'Project Alpha' },
  { id: 2, name: 'Bob Smith', project: 'Project Beta' },
  { id: 3, name: 'Carol White', project: 'Project Gamma' },
];

const teams = [
  { id: 1, name: 'Team Alpha' },
  { id: 2, name: 'Team Beta' },
  { id: 3, name: 'Team Gamma' },
];

const AssignEmployees = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamTasks, setTeamTasks] = useState([]);

  const handleAssignEmployee = () => {
    console.log(`Assigned ${employeeName} to ${projectName}`);
    setEmployeeName('');
    setProjectName('');
  };

  const handleAssignTask = () => {
    if (selectedTeam && taskName) {
      setTeamTasks([...teamTasks, { team: selectedTeam, task: taskName }]);
      setTaskName('');
      setSelectedTeam('');
    }
  };

  const handleRemoveTask = (index) => {
    setTeamTasks(teamTasks.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Assign Employees and Tasks
        </Typography>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Assign Employees to Projects</Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Employee Name"
                fullWidth
                margin="normal"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              <TextField
                label="Project Name"
                fullWidth
                margin="normal"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleAssignEmployee}
              >
                Assign
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Assign Tasks to Teams</Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Select Team"
                fullWidth
                margin="normal"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.name}>
                    {team.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Task Name"
                fullWidth
                margin="normal"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleAssignTask}
                disabled={!selectedTeam || !taskName}
              >
                Assign Task
              </Button>
              <List>
                {teamTasks.map((task, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemoveTask(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemText
                      primary={`${task.team} - ${task.task}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Assigned Employees</Typography>
          <List>
            {assignedEmployees.map(employee => (
              <ListItem key={employee.id}>
                <ListItemText
                  primary={`${employee.name} - ${employee.project}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default AssignEmployees;
