import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Autocomplete
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ShiftScheduling = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newScheduleDate, setNewScheduleDate] = useState(new Date());
  const [newScheduleTime, setNewScheduleTime] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    // Fetch employees
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employees/schedules');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    // Fetch schedules
    const fetchSchedules = async () => {
      try {

        const schedules = await Promise.all(
          employees.map(async (employee) => {
            const response = await axios.get(`http://localhost:8080/api/employees/schedules/${employee.id}`);
            return response.data;
          })
        );
        setSchedules(schedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [employees]);

  const handleOpenAssignDialog = () => {
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedEmployee(null);
    setNewScheduleDate(new Date());
    setNewScheduleTime('');
  };

  const handleOpenUpdateDialog = (schedule) => {
    setSelectedSchedule(schedule);
    setNewScheduleDate(new Date(schedule.scheduleDateTime));
    setNewScheduleTime(schedule.scheduleDateTime.split('T')[1].split(':').join(':'));
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedSchedule(null);
    setNewScheduleDate(new Date());
    setNewScheduleTime('');
  };

  const handleAssignSchedule = async () => {
    if (selectedEmployee) {
      try {
        const scheduleDateTime = new Date(`${newScheduleDate.toISOString().split('T')[0]}T${newScheduleTime}`).toISOString();
        const payload = {
          employeeId: selectedEmployee.id,
          employeeUsername: selectedEmployee.username,
          scheduleDateTime
        };

        const response = await axios.post('http://localhost:8080/api/employees/schedules', payload);
        setSchedules((prev) => [...prev, response.data]);
        handleCloseAssignDialog();
      } catch (error) {
        console.error('Error assigning schedule:', error);
      }
    }
  };

  const handleUpdateSchedule = async () => {
    if (selectedSchedule) {
      try {
        const scheduleDateTime = new Date(`${newScheduleDate.toISOString().split('T')[0]}T${newScheduleTime}`).toISOString();
        const payload = {
          ...selectedSchedule,
          scheduleDateTime
        };

        const response = await axios.put(`http://localhost:8080/api/employees/schedules/${selectedSchedule.id}`, payload);
        setSchedules((prev) => prev.map((sched) => (sched.id === response.data.id ? response.data : sched)));
        handleCloseUpdateDialog();
      } catch (error) {
        console.error('Error updating schedule:', error);
      }
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/schedules/${id}`);
      setSchedules((prev) => prev.filter((sched) => sched.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shift Scheduling
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenAssignDialog}>
        Assign Schedule
      </Button>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Employee Schedules</Typography>
        <List>
          {schedules.map((schedule) => (
            <ListItem key={schedule.id}>
              <ListItemText
                primary={`Employee: ${schedule.employeeUsername}`}
                secondary={`Schedule: ${new Date(schedule.scheduleDateTime).toLocaleString()}`}
              />
              <Button variant="outlined" onClick={() => handleOpenUpdateDialog(schedule)}>
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteSchedule(schedule.id)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
        <DialogTitle>Assign Schedule</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.username || ''}
            value={selectedEmployee}
            onChange={(event, newValue) => setSelectedEmployee(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee Username"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
            )}
          />
          <Typography variant="body1">Selected Date: {newScheduleDate.toDateString()}</Typography>
          <TextField
            label="Time"
            type="time"
            value={newScheduleTime}
            onChange={(e) => setNewScheduleTime(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssignSchedule} color="primary" disabled={!selectedEmployee || !newScheduleTime}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Schedule</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Employee: {selectedSchedule?.employeeUsername}</Typography>
          <Typography variant="body1">Current Date: {new Date(selectedSchedule?.scheduleDateTime).toDateString()}</Typography>
          <TextField
            label="Date"
            type="date"
            value={newScheduleDate.toISOString().split('T')[0]}
            onChange={(e) => setNewScheduleDate(new Date(e.target.value))}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            value={newScheduleTime}
            onChange={(e) => setNewScheduleTime(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSchedule} color="primary" disabled={!selectedSchedule || !newScheduleTime}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShiftScheduling;
