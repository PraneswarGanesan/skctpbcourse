// src/components/dashboards/TeamLeadDashboard/SidePanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Message, AccountCircle, Work } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import './TeamLeadSidePanel.css';

const TeamLeadSidePanel = () => {
  return (
    <div className='team-lead-side-panel'>
      <List>
        <ListItem button component={Link} to="/team-lead-dashboard/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/team-lead-dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/team-lead-dashboard/manage-team">
          <ListItemIcon><Work /></ListItemIcon>
          <ListItemText primary="Manage Team" />
        </ListItem>
        <ListItem button component={Link} to="/team-lead-dashboard/shift-scheduling">
          <ListItemIcon><Message /></ListItemIcon>
          <ListItemText primary="Shift Scheduling" />
        </ListItem>
        <ListItem button component={Link} to="/team-lead-dashboard/profile">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default TeamLeadSidePanel;
