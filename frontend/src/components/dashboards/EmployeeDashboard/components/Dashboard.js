import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(null); // Store user ID here

  // Replace with your method to fetch the current logged-in user ID
  useEffect(() => {
    // Example to fetch user ID, you may need to replace this with actual implementation
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/api/current-user');
        setUserId(response.data.id); // Assuming response contains user ID
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchTasks = async () => {
        console.log(userId);
        try {
          const response = await axios.get(`http://localhost:8080/api/employeetasks/employee/${userId}`);
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      fetchTasks();
    }
  }, [userId]);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
    setStatus(task.status); // Set the current status when opening the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleStatusChange = async () => {
    if (selectedTask) {
      try {
        const payload = { status };
        await axios.patch(`http://localhost:8080/api/employeetasks/${selectedTask.id}/status`, payload);
        setTasks((prevTasks) => 
          prevTasks.map(task => 
            task.id === selectedTask.id ? { ...task, status } : task
          )
        );
        handleClose();
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: '150px',
                backgroundColor: '#f5f5f5',
                boxShadow: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6">{task.taskName}</Typography>
              <Typography variant="body2">{`Date: ${task.date} ${task.time}`}</Typography>
              <Typography variant="body2">{`Status: ${task.status}`}</Typography>
              <IconButton
                sx={{ mt: 'auto' }}
                onClick={() => handleClickOpen(task)}
              >
                <MoreVert />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Task Status Update */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Task Status</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
