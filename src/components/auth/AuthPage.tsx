import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { AuthPageProps } from '../../types';
import { authPageStyles } from '../../styles/auth';

const AuthPage: React.FC<AuthPageProps> = ({ 
  title, 
  maxWidth, 
  form, 
  links, 
  linksJustify 
}) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    // If user is admin, redirect to admin dashboard
    if (user?.role === 'admin') {
      return <Navigate to="/admin" />;
    }
    // Otherwise redirect to home page
    return <Navigate to="/" />;
  }
  
  return (
    <Container component="main" sx={authPageStyles.container(maxWidth)}>
      <Box sx={authPageStyles.mainBox}>
        <Paper elevation={3} sx={authPageStyles.paper}>
          <Typography component="h1" variant="h5" gutterBottom sx={authPageStyles.title}>
            {title}
          </Typography>
          
          {form}
          
          <Stack sx={authPageStyles.linksStack(linksJustify)}>
            {links}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage; 