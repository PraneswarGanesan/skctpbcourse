import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import illustration from '../assets/illu-1.png';
import { Typography, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: form.username,
        password: form.password,
      });
  
      const userInfo = response.data;
      console.log("User Info:", userInfo); 

      const expirationTime = new Date().getTime() + 5000; 
  
      localStorage.setItem('username', form.username);
      localStorage.setItem('expiration', expirationTime);
      localStorage.setItem('role', userInfo.role);
      localStorage.setItem('id', userInfo.id);
      localStorage.setItem('data', JSON.stringify(userInfo));
      console.log("Expiration Time:", expirationTime);
      console.log("Expiration Time:", localStorage.getItem('expiration'));
  
      onLogin(userInfo);
  
      // Handle role as a single string rather than an array
      switch (userInfo.role) {  // Adjusted for single role string
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'employee':
          navigate('/employee-dashboard');
          break;
        case 'team_lead':
          navigate('/team-lead-dashboard');
          break;
        case 'product_manager':
          navigate('/product-manager-dashboard');
          break;
        default:
          navigate('/');
      } 
    } catch (err) {
      console.error("Login Error:", err); // Log error for debugging
      setError('Login failed. Please check your credentials and try again.');
    }
  };
  
  
  return (
    <div className='Login'>
      <div className='login-bg'></div> 
      <div className='login'>
        <div className='login-container'>
          <div className='login-img'>
            <img src={illustration} alt="Illustration" />
          </div>
          <div className='login-card'>
            <div className='login-form'>
              <div className="title">
                <Typography variant='h4'><b>Login</b></Typography>
              </div>
              {error && <Typography color="error">{error}</Typography>}
              <form className="form" onSubmit={handleSubmit}>
                <label>Username</label>
                <TextField name='username' type='text' variant='outlined' value={form.username} onChange={handleChange} required />
                <label>Password</label>
                <TextField name='password' type='password' variant='outlined' value={form.password} onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" fullWidth id="button">Login</Button>
                <Typography className="message">
                  Don't have an account?{' '}
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                    Sign up
                  </span>
                </Typography>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;