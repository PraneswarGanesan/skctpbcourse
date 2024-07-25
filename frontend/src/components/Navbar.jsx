import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="Navbar">
      <div className="nav-content">
        <div className="nav-left">
          <div className="logo">
            <Link to="/"><h1>Workwave</h1></Link>
          </div>
        </div>
        <div className="nav-right">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
