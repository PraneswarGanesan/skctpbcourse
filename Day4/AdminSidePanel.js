// src/components/dashboards/AdminDashboard/AdminSidePanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, People, Category as CategoryIcon, Message as MessageIcon, AccountCircle } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import './AdminSidePanel.css';
const AdminSidePanel = () => {
  return (
    <div className="admin-side-panel">
      
      <List>
        <ListItem button component={Link} to="/admin-dashboard/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/manage-user">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/category">
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/message">
          <ListItemIcon><MessageIcon /></ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
        <ListItem button component={Link} to="/admin-dashboard/profile">
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default AdminSidePanel;
