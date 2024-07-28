// src/components/dashboards/ProductManagerDashboard/ProductManagerSidePanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Assignment, Schedule, Create, AccountCircle } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const drawerWidth = 240;

const ProductManagerSidePanel = () => {
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
        <ListItem button component={Link} to="/product-manager-dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/assign-employees">
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText primary="Assign Employees" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/view-team-lead-schedule">
          <ListItemIcon><Schedule /></ListItemIcon>
          <ListItemText primary="View Team Lead Schedule" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/create-projects">
          <ListItemIcon><Create /></ListItemIcon>
          <ListItemText primary="Create Projects" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/profile">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: '#444' }} /> {/* Divider color */}
    </Drawer>
  );
};

export default ProductManagerSidePanel;
