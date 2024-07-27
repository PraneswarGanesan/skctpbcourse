// src/components/ProductManagerDashboard/AssignEmployees.js
import React, { useState } from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, Grid, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

// Sample data for assigned employees
const assignedEmployees = [
  { id: 1, name: 'Alice Johnson', project: 'Project Alpha' },
  { id: 2, name: 'Bob Smith', project: 'Project Beta' },
  { id: 3, name: 'Carol White', project: 'Project Gamma' },
];

const AssignEmployees = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [projectName, setProjectName] = useState('');

  const handleAssign = () => {
    // Handle employee assignment logic here
    console.log(`Assigned ${employeeName} to ${projectName}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Assign Employees
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
                onClick={handleAssign}
              >
                Assign
              </Button>
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
