
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

const dummyRequests = [
  { id: 1, employee: 'John Doe', request: 'Request for shift change', type: 'shift', status: 'pending' },
  { id: 2, employee: 'Jane Smith', request: 'Request for time off', type: 'timeOff', status: 'pending' },
];

const ShiftScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [shifts, setShifts] = useState([]);
  const [requests, setRequests] = useState(dummyRequests);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [timeOffOpen, setTimeOffOpen] = useState(false);
  const [timeOffEmployee, setTimeOffEmployee] = useState('');

  const handleDateChange = (date) => setSelectedDate(date);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEmployee('');
    setSelectedTime('');
  };

  const handleAssignShift = () => {
    setShifts([...shifts, { date: selectedDate, employee: selectedEmployee, time: selectedTime }]);
    handleCloseDialog();
  };

  const handleAcceptRequest = (requestId) => {
    setRequests(requests.filter(request => request.id !== requestId));
    const acceptedRequest = requests.find(request => request.id === requestId);
    setCompletedRequests([...completedRequests, { ...acceptedRequest, status: 'accepted' }]);
  };

  const handleOpenTimeOffDialog = (employee) => {
    setTimeOffEmployee(employee);
    setTimeOffOpen(true);
  };

  const handleCloseTimeOffDialog = () => {
    setTimeOffOpen(false);
    setTimeOffEmployee('');
  };

  const handleTimeOffRequest = () => {
    handleCloseTimeOffDialog();
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
                  primary={`Date: ${shift.date.toDateString()}, Time: ${shift.time}, Employee: ${shift.employee}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Pending Employee Requests</Typography>
          <List>
            {requests.filter(request => request.status === 'pending').map((request, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Employee: ${request.employee}, Request: ${request.request}`}
                />
                {request.type === 'shift' ? (
                  <Button variant="contained" color="primary" onClick={() => handleAcceptRequest(request.id)}>
                    Accept
                  </Button>
                ) : (
                  <Button variant="contained" color="secondary" onClick={() => handleOpenTimeOffDialog(request.employee)}>
                    Apply Time Off
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Completed Requests</Typography>
          <List>
            {completedRequests.map((request, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Employee: ${request.employee}, Request: ${request.request}, Status: ${request.status}`}
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
              label="Employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAssignShift} color="primary" disabled={!selectedEmployee || !selectedTime}>
              Assign
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={timeOffOpen} onClose={handleCloseTimeOffDialog}>
          <DialogTitle>Time Off Request</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Employee: {timeOffEmployee}</Typography>
            <TextField
              label="Reason"
              fullWidth
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTimeOffDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleTimeOffRequest} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ShiftScheduling;
