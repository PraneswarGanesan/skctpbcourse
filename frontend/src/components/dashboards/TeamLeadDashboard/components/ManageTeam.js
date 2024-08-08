import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Autocomplete
} from '@mui/material';

const ManageTeam = () => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTaskTime, setNewTaskTime] = useState('08:00');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    // Fetch teams and tasks
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employeetasks/all');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTeams();
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      // Prepare employee options for autocomplete
      const employees = selectedTeam.memberUsernames.map(username => ({ username }));
      setEmployeeOptions(employees);
    }
  }, [selectedTeam]);

  const handleAssignTask = async () => {
    if (selectedTeam && selectedEmployee) {
      try {
        const payload = {
          taskName: newTaskName,
          teamLeadId: selectedTeam.leadId,
          employeeId: selectedEmployee.id,
          date: newTaskDate,
          time: newTaskTime
        };

        const response = await axios.post('http://localhost:8080/api/employeetasks/post', payload);
        setTasks((prev) => [...prev, response.data]);
        setNewTaskName('');
        setNewTaskDate(new Date().toISOString().split('T')[0]);
        setNewTaskTime('08:00');
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Error assigning task:', error);
      }
    } else {
      alert('Please select an employee to assign the task to.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Team
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Teams</Typography>
        <List>
          {teams.map((team) => (
            <ListItem
              key={team.id}
              button
              onClick={() => setSelectedTeam(team)}
            >
              <ListItemText
                primary={`Team: ${team.name}`}
                secondary={`Project: ${team.project.name} - Lead: ${team.leadUsername}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {selectedTeam && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Assign Task to Team</Typography>
          <TextField
            label="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Autocomplete
            options={employeeOptions}
            getOptionLabel={(option) => option.username}
            onChange={(event, value) => {
              const employeeId = selectedTeam.memberIds[employeeOptions.indexOf(value)];
              setSelectedEmployee({ id: employeeId });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employee"
                variant="outlined"
                fullWidth
              />
            )}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignTask}
          >
            Assign Task
          </Button>
        </Paper>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Tasks</Typography>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={`Task: ${task.taskName}`}
                secondary={`Assigned to: Employee ${task.employeeId} - Due Date: ${task.date} ${task.time}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ManageTeam;
