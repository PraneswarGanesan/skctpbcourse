import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel'; // Corrected import path
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

// Sample data for demonstration
const sampleData = {
  HR: 5,
  ProductManagers: 3,
  Employees: 80,
  TeamLeads: 4,
};

// Sample user list
const userList = [
  { id: 1, name: 'John Doe', role: 'HR', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', role: 'Employee', email: 'jane.smith@example.com' },
  // Add more sample users as needed
];

const ManageUsers = () => {
  const [userStats, setUserStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    setUserStats(sampleData);
    setUsers(userList);
  }, []);

  const handleEdit = (userId) => {
    // Handle edit functionality here
    console.log('Edit user with ID:', userId);
  };

  const handleDelete = (userId) => {
    // Handle delete functionality here
    console.log('Delete user with ID:', userId);
  };

  return (
    <div>
      <SidePanel />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>

        <Grid container spacing={3}>
          {Object.entries(userStats).map(([role, count]) => (
            <Grid item xs={12} sm={6} md={3} key={role}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {role}
                  </Typography>
                  <Typography variant="h4" color="text.secondary">
                    {count} Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            User List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleEdit(user.id)} sx={{ mr: 1 }}>
                          Edit
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default ManageUsers;
