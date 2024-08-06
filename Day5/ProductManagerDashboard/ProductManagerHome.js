// src/components/dashboards/ProductManagerDashboard/ProductManagerHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductManagerHome.css'; 

const ProductManagerHome = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="product-manager-home-container">
      <div className="product-manager-home-content">
        <h2>Welcome, {user ? user.role : 'Product Manager'}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProductManagerHome;
