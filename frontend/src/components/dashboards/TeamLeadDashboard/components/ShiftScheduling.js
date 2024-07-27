// src/components/dashboards/TeamLeadDashboard/components/ShiftScheduling.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TeamLeadSidePanel from '../TeamLeadSidePanel';
import {List,ListItem, ListItemText} from '@mui/material';

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const ShiftScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [shifts, setShifts] = useState([]);

  const handleDateChange = date => setSelectedDate(date);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEmployee('');
  };

  const handleAssignShift = () => {
    setShifts([...shifts, { date: selectedDate, employee: selectedEmployee }]);
    handleCloseDialog();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TeamLeadSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Shift Scheduling
        </Typography>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ mt: 2 }}>
          Assign Shift
        </Button>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Assigned Shifts</Typography>
          <List>
            {shifts.map((shift, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Date: ${shift.date.toDateString()}, Employee: ${shift.employee}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Assign Shift</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Date: {selectedDate.toDateString()}</Typography>
            <TextField
              select
              label="Employee"
              value={selectedEmployee}
              onChange={e => setSelectedEmployee(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            >
              {employees.map(employee => (
                <MenuItem key={employee.id} value={employee.name}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAssignShift} color="primary" disabled={!selectedEmployee}>
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ShiftScheduling;
