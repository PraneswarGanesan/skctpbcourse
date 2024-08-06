import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/home.css';
import img2 from '../assets/img2.png';
const H = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const redirectToDashboard = () => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin-dashboard/dashboard');
          break;
        case 'employee':
          navigate('/employee-dashboard');
          break;
        case 'team_lead':
          navigate('/team-lead-dashboard');
          break;
        case 'product_manager':
          navigate('/product-manager-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      
      <img src={img2} alt="Logo" />
      <div className='c1'>
        <h1 className='h1'>Effortless Staff Scheduling with <b>WorkCrew...</b></h1>
        <h1>Welcome {user ? user.role : 'Guest'}</h1>
        {!user ? (
          <div className='butt'>
            <p>Click below to login:</p>
            <button onClick={() => navigate('/login')}><b>Login</b></button>
          </div>
        ) : (
          <div className="user-actions">
            <button onClick={redirectToDashboard}><b>View Dashboard</b></button>
            <button onClick={handleLogout}><b>Logout</b></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default H;

