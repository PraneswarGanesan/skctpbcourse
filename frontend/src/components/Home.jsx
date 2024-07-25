import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import illustration from '../assets/illu-2.png'; // Import the image
import '../styles/Home.css'; // Import the CSS file
import Navbar from './Navbar';
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
    <div className='home'>
                    <Navbar />
    <Container className="home-container">
      <div className='hero'>
      <Box className="home-image">
        <img src={illustration} alt="Illustration" />
      </Box>
      <Box className="home-content">
        <Typography variant="h2">
          Welcome {user ? user.role : 'Guest'}
        </Typography>
        {user ? (
          <>
            <Button variant="contained" color="secondary" onClick={redirectToDashboard}>
              Go to your dashboard
            </Button>
            <Button variant="contained" color="secondary" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography>
            Please <a href="/login">login</a> to see your dashboard.
          </Typography>
        )}
      </Box>
      </div>
    </Container>
    </div>
  );
};

export default Home;
