import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../styles/login.css';
import img3 from '../assets/img3.png';

function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === formData.email && user.pass === formData.password && user.role === formData.role);
    
    if (user) {
      navigate('/', { state: { user } });
    } else {
      alert('Invalid email, password, or role');
    }
  };

  return (
    <div className='login'>
      <img src={img3} alt="Logo" className='im' />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2 className='sig'>Log In</h2>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Here"
            value={formData.email}
            onChange={handleChange}
            required
          /><br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password Here"
            value={formData.password}
            onChange={handleChange}
            required
          /><br />
          <label>Role:</label>
          <TextField
            name="role"
            select
            variant="outlined"
            required
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="team_lead">Team Lead</MenuItem>
            <MenuItem value="product_manager">Product Manager</MenuItem>
          </TextField>
          <button className='bt' type='submit'><b>Login</b></button>
          <br />
          <p>Don't have an Account? <Link to='/signup' className='l'><b>Sign Up</b></Link></p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
