// src/components/dashboards/EmployeeDashboard/SidePanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import {  List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Message, AccountCircle, Schedule, Event } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import './EmployeeSidePanel.css';

const EmployeeSidePanel = () => {
  return (
    <div className='employee-side-panel'>
      <List>
        <ListItem button component={Link} to="/employee-dashboard/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard/message">
          <ListItemIcon><Message /></ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard/profile">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard/my-shifts">
          <ListItemIcon><Schedule /></ListItemIcon>
          <ListItemText primary="My Shifts" />
        </ListItem>
        <ListItem button component={Link} to="/employee-dashboard/time-off">
          <ListItemIcon><Event /></ListItemIcon>
          <ListItemText primary="Time Off" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default EmployeeSidePanel;
