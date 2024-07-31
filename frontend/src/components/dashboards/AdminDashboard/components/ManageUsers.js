import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import axios from 'axios';

const ManageUsers = () => {
  const [userStats, setUserStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user statistics and list of users
    const fetchData = async () => {
      try {
        // Update with actual API endpoints
        const statsResponse = await axios.get('http://localhost:8080/api/admin/users/stats'); // Adjust the endpoint if necessary
        setUserStats(statsResponse.data);

        const usersResponse = await axios.get('http://localhost:8080/api/admin/users'); // Ensure this endpoint is correct
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (userId) => {
    console.log('Edit user with ID:', userId);
    // Implement edit logic or navigation
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${userId}`); // Correctly format the URL
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
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
