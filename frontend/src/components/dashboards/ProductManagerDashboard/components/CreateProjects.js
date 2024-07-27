// src/components/ProductManagerDashboard/CreateProjects.js
import React from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

const CreateProjects = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Create New Project
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Project Details</Typography>
          <TextField label="Project Name" fullWidth margin="normal" />
          <TextField label="Description" fullWidth multiline rows={4} margin="normal" />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Create Project
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateProjects;
