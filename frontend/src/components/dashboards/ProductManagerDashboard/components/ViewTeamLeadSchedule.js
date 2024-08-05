import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText, Autocomplete } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ProductManagerSidePanel from '../ProductManagerSidePanel';

const ViewTeamLeadSchedule = () => {
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [newScheduleDate, setNewScheduleDate] = useState(new Date());
  const [newScheduleTime, setNewScheduleTime] = useState('');
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [openTimeOffDialog, setOpenTimeOffDialog] = useState(false);
  const [selectedTimeOffRequest, setSelectedTimeOffRequest] = useState(null);

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product_manager/schedule/team_leads');
        if (Array.isArray(response.data)) {
          setTeamLeads(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching team leads:', error);
      }
    };

    fetchTeamLeads();
  }, []);

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/team_leads/time_off_requests');
        if (Array.isArray(response.data)) {
          setTimeOffRequests(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching time off requests:', error);
      }
    };

    fetchTimeOffRequests();
  }, []);

  const handleOpenAssignDialog = () => {
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedTeamLead(null);
    setNewScheduleDate(new Date());
    setNewScheduleTime('');
  };

  const handleAssignSchedule = async () => {
    if (selectedTeamLead) {
      try {
        // Prepare the schedule date and time
        const scheduleDateTime = new Date(`${newScheduleDate.toISOString().split('T')[0]}T${newScheduleTime}`).toISOString();
        
        // Prepare the request payload
        const payload = {
          teamLeadId: selectedTeamLead.id,
          teamLeadUsername: selectedTeamLead.username,
          scheduleDateTime
        };
  
        // Log the payload to check the data being sent
        console.log('Payload:', payload);
  
        // Send the request
        const response = await axios.post('http://localhost:8080/api/product_manager/schedule/schedule', payload);
        
        // Log the response data
        console.log('Response Data:', response.data);
  
        // Update team lead schedule list after assigning
        setTeamLeads(prev => prev.map(tl =>
          tl.id === selectedTeamLead.id ? { ...tl, schedule: { date: newScheduleDate, time: newScheduleTime } } : tl
        ));
        handleCloseAssignDialog();
      } catch (error) {
        console.error('Error assigning schedule:', error);
      }
    } else {
      console.log('Team lead username is required');
    }
  };
  

  const handleOpenTimeOffDialog = (request) => {
    setSelectedTimeOffRequest(request);
    setOpenTimeOffDialog(true);
  };

  const handleCloseTimeOffDialog = () => {
    setOpenTimeOffDialog(false);
    setSelectedTimeOffRequest(null);
  };

  const handleApproveTimeOff = async () => {
    if (selectedTimeOffRequest) {
      try {
        await axios.put(`http://localhost:8080/api/product_manager/schedule/time_off_requests/${selectedTimeOffRequest.id}`, { status: 'approved' });
        setTimeOffRequests(prev => prev.filter(request => request.id !== selectedTimeOffRequest.id));
        handleCloseTimeOffDialog();
      } catch (error) {
        console.error('Error approving time off request:', error);
      }
    }
  };

  const handleRejectTimeOff = async () => {
    if (selectedTimeOffRequest) {
      try {
        await axios.put(`http://localhost:8080/api/product_manager/schedule/time_off_requests/${selectedTimeOffRequest.id}`, { status: 'rejected' });
        setTimeOffRequests(prev => prev.filter(request => request.id !== selectedTimeOffRequest.id));
        handleCloseTimeOffDialog();
      } catch (error) {
        console.error('Error rejecting time off request:', error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          View Team Lead Schedule
        </Typography>
        <Calendar onChange={setNewScheduleDate} value={newScheduleDate} />
        <Button variant="contained" color="primary" onClick={handleOpenAssignDialog} sx={{ mt: 2 }}>
          Assign Schedule
        </Button>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Team Lead Schedules</Typography>
          <List>
            {teamLeads.map((teamLead) => (
              <ListItem key={teamLead.id}>
                <ListItemText
                  primary={`Team Lead: ${teamLead.username}`}
                  secondary={`Schedule: ${teamLead.schedule ? `${new Date(teamLead.schedule.date).toDateString()} at ${teamLead.schedule.time}` : 'No schedule set'}`}
                />
                <Button variant="outlined" onClick={handleOpenAssignDialog}>
                  Update Schedule
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
          <DialogTitle>Assign or Update Schedule</DialogTitle>
          <DialogContent>
            <Autocomplete
              options={teamLeads}
              getOptionLabel={(option) => option.username || ''}
              value={selectedTeamLead}
              onChange={(event, newValue) => setSelectedTeamLead(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Team Lead Username"
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
            <Button onClick={handleAssignSchedule} color="primary" disabled={!selectedTeamLead || !newScheduleTime}>
              Assign
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openTimeOffDialog} onClose={handleCloseTimeOffDialog}>
          <DialogTitle>Time Off Request</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Team Lead: {selectedTimeOffRequest?.teamLeadName}</Typography>
            <TextField
              label="Reason"
              fullWidth
              value={selectedTimeOffRequest?.reason || ''}
              sx={{ mt: 2 }}
              disabled
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTimeOffDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleApproveTimeOff} color="primary" disabled={!selectedTimeOffRequest}>
              Approve
            </Button>
            <Button onClick={handleRejectTimeOff} color="secondary" disabled={!selectedTimeOffRequest}>
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ViewTeamLeadSchedule;
