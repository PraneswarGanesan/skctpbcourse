import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'employee':
          navigate('/employee-dashboard');
          break;
        case 'hr':
          navigate('/hr-dashboard');
          break;
        case 'team_lead':
          navigate('/team-lead-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Welcome {user ? user.role : 'Guest'}</h1>
      {user ? (
        <>
          <button onClick={redirectToDashboard}>Go to your dashboard</button>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <p>Please <a href="/login">login</a> to see your dashboard.</p>
      )}
    </div>
  );
};

export default Home;
