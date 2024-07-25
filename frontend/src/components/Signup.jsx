import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Brightness4 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
import '../styles/Signup.css';
import illustration from '../assets/illu-1.png';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2',
    },
  },
}));

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    nav('/home');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.style.setProperty(
      '--background-color',
      darkMode ? '#ffffff' : '#1e1e1e'
    );
  };

  return (
    <div className={`signup-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>
      <div className={`signup-card ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="signup-image">
          <img src={illustration} alt="Illustration" />
        </div>
        <div className="signup-form">
          <Typography variant="h4" style={{marginLeft: '25px'}}>
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <StyledTextField
              name="firstName"
              variant="outlined"
              required
              value={form.firstName}
              onChange={handleChange}
            
            />
            <label>Last Name</label>
            <StyledTextField
              name="lastName"
              variant="outlined"
              required
              value={form.lastName}
              onChange={handleChange}
            
            />
            <label>Username</label>
            <StyledTextField
              name="username"
              variant="outlined"
              required
              value={form.username}
              onChange={handleChange}
             
            />
            <label>Email</label>
            <StyledTextField
              name="email"
              type="email"
              variant="outlined"
              required
              value={form.email}
              onChange={handleChange}
              
            />
            <label>Password</label>
            <StyledTextField
              name="password"
              type="password"
              variant="outlined"
              required
              value={form.password}
              onChange={handleChange}
               
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              id="button"
            >
              Signup
            </Button>
          </form>
          <Typography className="message">
            Already have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => nav('/login')}>
              Login
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Signup;
