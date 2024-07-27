// src/components/dashboards/EmployeeDashboard/components/TimeOff.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import SidePanel from '../EmployeeSidePanel';

const initialRequests = [
  { id: 1, date: '2024-08-01', reason: 'Medical Appointment', status: 'Approved' },
  { id: 2, date: '2024-08-05', reason: 'Family Event', status: 'Pending' },
];

const TimeOff = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ date: '', reason: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSubmit = () => {
    setRequests([...requests, { ...newRequest, id: requests.length + 1, status: 'Pending' }]);
    setOpen(false);
    setNewRequest({ date: '', reason: '' });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Time Off Requests
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Request Time Off
        </Button>
        <Divider sx={{ my: 2 }} />
        {requests.map((request) => (
          <Paper key={request.id} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">{request.date}</Typography>
            <Typography variant="body1">{request.reason}</Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {request.status}
            </Typography>
          </Paper>
        ))}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Request Time Off</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={newRequest.date}
              onChange={handleRequestChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              name="reason"
              label="Reason"
              type="text"
              fullWidth
              value={newRequest.reason}
              onChange={handleRequestChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TimeOff;
