import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Brightness4 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
import '../styles/Login.css';  // Import the CSS file for styling
import { styled } from '@mui/material/styles';
import illustration from '../assets/illu-1.png'; // Import the image

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change text color
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change label color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change border color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2', // Change border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#bb86fc' : '#1976d2', // Change border color when focused
    },
  },
}));

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === 'test@test.com' && form.password === '123456789') {
      const userInfo = { email: form.email, role: form.role };
      onLogin(userInfo);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.style.setProperty(
      '--background-color',
      darkMode ? '#ffffff' : '#1e1e1e'
    );
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>
      <div className={`login-card ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="login-image">
          <img src={illustration} alt="Illustration" />
        </div>
        <div className="login-form">
          <Typography variant="h4" style={{ marginLeft: '25px',  paddingTop: '70px'}}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} className={`${darkMode ? 'dark-mode' : 'light-mode'}`}> 
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
            <label>Role</label>
            <StyledTextField
              name="role"
              select
              variant="outlined"
              required
              value={form.role}
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="team_lead">Team Lead</MenuItem>
            </StyledTextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              id="button"
            >
              Login
            </Button>
          </form>
          <Typography className="message">
            Don't have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
              Sign up
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
