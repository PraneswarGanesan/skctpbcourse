import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography } from '@mui/material';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Handle signup logic
  };

  return (
    <Container>
      <Typography variant="h4">Signup</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth />
        <TextField name="role" label="Role" select value={form.role} onChange={handleChange} fullWidth>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="hr">HR</MenuItem>
          <MenuItem value="team_lead">Team Lead</MenuItem>
        </TextField>
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">Signup</Button>
      </form>
    </Container>
  );
};

export default Signup;
