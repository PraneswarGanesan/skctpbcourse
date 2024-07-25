import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import './styles/DashNav.css';

const DashNav = () => {
  return (
    <div className="dashnav-container">
      <Link to="/home" className="home-link">
        <IconButton color="white">
          <HomeIcon />
        </IconButton>
      </Link>
    </div>
  );
};

export default DashNav;
