import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, MenuItem, Container, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === 'test@test.com' && form.password === '123456789') {
      const userInfo = { email: form.email, role: form.role };
      onLogin(userInfo);
      switch (form.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'employee':
          navigate('/employee-dashboard');
          break;
        case 'hr':
          navigate('/hr-dashboard');
          break;
        case 'team_lead':
          navigate('/team-lead-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth />
        <TextField name="role" label="Role" select value={form.role} onChange={handleChange} fullWidth>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="hr">HR</MenuItem>
          <MenuItem value="team_lead">Team Lead</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
      <Typography>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Container>
  );
};

export default Login;
