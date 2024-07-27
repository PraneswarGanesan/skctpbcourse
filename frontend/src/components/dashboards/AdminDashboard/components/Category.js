// src/components/dashboards/AdminDashboard/components/Category.js
import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { TextField, List, ListItem, ListItemText, Divider } from '@mui/material';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch categories from API or use sample data
    setCategories([
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' },
      { id: 3, name: 'Finance' },
    ]);
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SidePanel />
      <h2>Categories</h2>
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <List>
        {filteredCategories.map((category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Category;
