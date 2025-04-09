import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { notFoundPageStyles } from '../styles/pages';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Container sx={notFoundPageStyles.container}>
      <Paper 
        elevation={3} 
        sx={notFoundPageStyles.paper}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={notFoundPageStyles.title}
        >
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom sx={notFoundPageStyles.subtitle}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" paragraph sx={notFoundPageStyles.message}>
          Oops! The page you are looking for doesn't exist or has been moved.
          Please check the URL or go back to the homepage.
        </Typography>
        
        <Box 
          component="img" 
          alt="404 illustration"
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          sx={notFoundPageStyles.image}
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={notFoundPageStyles.button}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage; 