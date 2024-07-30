
import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TeamLeadSidePanel from '../TeamLeadSidePanel';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageTeam = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', assignedTo: 'Team Member 1', date: '2024-07-30', time: '10:00' },
    { id: 2, name: 'Task 2', assignedTo: 'Team Member 2', date: '2024-07-31', time: '14:00' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleAddTask = () => {
    if (newTask && assignedTo && date && time) {
      setTasks([...tasks, { id: tasks.length + 1, name: newTask, assignedTo, date, time }]);
      setNewTask('');
      setAssignedTo('');
      setDate('');
      setTime('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TeamLeadSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Manage Team
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Paper sx={{ p: 2, width: '48%' }}>
            <Typography variant="h6" gutterBottom>
              Assign Task
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Task Name"
                  fullWidth
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Assign To"
                  fullWidth
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddTask}>
                  Assign
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 2, width: '48%' }}>
            <Typography variant="h6" gutterBottom>
              Team Tasks
            </Typography>
            <List>
              {tasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemText
                    primary={`${task.name} (Due: ${task.date} at ${task.time})`}
                    secondary={`Assigned to: ${task.assignedTo}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Calendar
          </Typography>
          <Calendar />
        </Box>
      </Box>
    </Box>
  );
};

export default ManageTeam;
