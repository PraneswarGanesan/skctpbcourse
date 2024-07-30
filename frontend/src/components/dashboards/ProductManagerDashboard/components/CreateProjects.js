import React, { useState } from 'react';
import ProductManagerSidePanel from '../ProductManagerSidePanel';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, MenuItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const roles = ['Team Leader', 'Senior Developer', 'Junior Developer', 'Tester'];

const CreateProjects = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleAddTeamMember = () => {
    if (selectedEmployee && selectedRole) {
      setTeamMembers([...teamMembers, { employee: selectedEmployee, role: selectedRole }]);
      setSelectedEmployee('');
      setSelectedRole('');
    }
  };

  const handleRemoveTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleCreateProject = () => {
    const projectDetails = {
      projectName,
      description,
      teamMembers,
    };
    console.log('Project Created:', projectDetails);
    // Reset fields
    setProjectName('');
    setDescription('');
    setTeamMembers([]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductManagerSidePanel />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Create New Project
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Project Details</Typography>
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Team Members</Typography>
          <TextField
            select
            label="Employee"
            fullWidth
            margin="normal"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.name}>
                {employee.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddTeamMember}
            disabled={!selectedEmployee || !selectedRole}
          >
            Add Team Member
          </Button>
          <List>
            {teamMembers.map((member, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveTeamMember(index)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText
                  primary={`${member.employee} - ${member.role}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleCreateProject}
          disabled={!projectName || !description || teamMembers.length === 0}
        >
          Create Project
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProjects;
