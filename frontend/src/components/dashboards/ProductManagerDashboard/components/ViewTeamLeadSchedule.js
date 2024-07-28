// src/components/ProductManagerDashboard/ViewTeamLeadSchedule.js
import React, { useState } from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

// Sample data for team lead schedule and time-offs
const initialTeamLeadSchedule = [
  { id: 1, name: 'John Doe', schedule: '9:00 AM - 5:00 PM', timeOff: [] },
  { id: 2, name: 'Jane Smith', schedule: '10:00 AM - 6:00 PM', timeOff: [] },
  { id: 3, name: 'Emily Johnson', schedule: '8:00 AM - 4:00 PM', timeOff: [] },
];

const ViewTeamLeadSchedule = () => {
  const [teamLeadSchedule, setTeamLeadSchedule] = useState(initialTeamLeadSchedule);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);
  const [newSchedule, setNewSchedule] = useState('');
  const [timeOff, setTimeOff] = useState('');

  const handleOpenAssignDialog = (teamLead) => {
    setSelectedTeamLead(teamLead);
    setNewSchedule(teamLead.schedule);
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedTeamLead(null);
    setNewSchedule('');
  };

  const handleAssignSchedule = () => {
    setTeamLeadSchedule(prev => prev.map(tl => 
      tl.id === selectedTeamLead.id ? { ...tl, schedule: newSchedule } : tl
    ));
    handleCloseAssignDialog();
  };

  const handleAddTimeOff = (teamLeadId) => {
    setTeamLeadSchedule(prev => prev.map(tl => 
      tl.id === teamLeadId ? { ...tl, timeOff: [...tl.timeOff, timeOff] } : tl
    ));
    setTimeOff('');
  };

  const handleRemoveTimeOff = (teamLeadId, index) => {
    setTeamLeadSchedule(prev => prev.map(tl => 
      tl.id === teamLeadId ? { ...tl, timeOff: tl.timeOff.filter((_, i) => i !== index) } : tl
    ));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          View Team Lead Schedule
        </Typography>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">Team Lead Schedules</Typography>
          <List>
            {teamLeadSchedule.map((schedule) => (
              <ListItem key={schedule.id}>
                <ListItemText
                  primary={`${schedule.name}`}
                  secondary={`Schedule: ${schedule.schedule}`}
                />
                <Button variant="outlined" onClick={() => handleOpenAssignDialog(schedule)}>
                  Assign Schedule
                </Button>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Time Off Requests</Typography>
                  <List>
                    {schedule.timeOff.map((off, index) => (
                      <ListItem key={index} secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveTimeOff(schedule.id, index)}>
                          <DeleteIcon />
                        </IconButton>
                      }>
                        <ListItemText primary={off} />
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    label="Add Time Off"
                    fullWidth
                    margin="normal"
                    value={timeOff}
                    onChange={(e) => setTimeOff(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddTimeOff(schedule.id)}
                  >
                    Add Time Off
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
          <DialogTitle>Assign New Schedule</DialogTitle>
          <DialogContent>
            <TextField
              label="New Schedule"
              fullWidth
              margin="normal"
              value={newSchedule}
              onChange={(e) => setNewSchedule(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssignDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAssignSchedule} color="primary">
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ViewTeamLeadSchedule;
