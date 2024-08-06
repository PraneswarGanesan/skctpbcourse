import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../styles/signup.css';
import img5 from '../assets/img5.png';

function SignUp() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    pass: '',
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

    const userExists = users.find(user => user.email === formData.email);
    if (userExists) {
      alert('Email already exists. Please use a different email.');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account successfully created');

    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='image-container'>
        <img src={img5} alt="Logo" />
      </div>
      <div className='form-container'>
        <form className='form2' onSubmit={handleSubmit}>
          <h2 className='head'>Sign Up</h2>
          <label>First Name:</label>
          <input
            type='text'
            name="fname"
            placeholder="Your First Name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
          <br />
          <label>Last Name:</label>
          <input
            type='text'
            name="lname"
            placeholder="Your Last Name"
            value={formData.lname}
            onChange={handleChange}
            required
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="pass"
            placeholder="Enter Password Here"
            value={formData.pass}
            onChange={handleChange}
            required
          />
          <br />
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
          <button type='submit' className='button'><b>Signup</b></button>
          <br />
          <p>Already have an Account? <Link to='/login' className='l'><b>Log In</b></Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;