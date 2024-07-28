// src/components/dashboards/TeamLeadDashboard/SidePanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Message, AccountCircle, Work } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const TeamLeadSidePanel = () => {
  const drawerWidth = 240;
  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#134B70', // Background color of the drawer
      },
      '& .MuiListItem-root': {
        color: '#fff', // Text color of the list items
      },
      '& .MuiListItemIcon-root': {
        color: '#fff', // Icon color of the list items
      },
    }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="/home">
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
    </Drawer>
  );
};

export default TeamLeadSidePanel;
