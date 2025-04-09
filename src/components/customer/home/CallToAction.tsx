import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography, Button, useTheme } from '@mui/material';
import { callToActionStyles } from '../../../styles/customer/home';

const CallToAction: React.FC = () => {
  const theme = useTheme();
  const styles = callToActionStyles(theme);
  
  return (
    <Paper sx={styles.container}>
      <Typography variant="h4" component="h2" gutterBottom>
        Ready to start shopping?
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Join thousands of satisfied customers who love our products.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={RouterLink}
        to="/register"
        sx={styles.registerButton}
      >
        Register Now
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        component={RouterLink}
        to="/login"
      >
        Login
      </Button>
    </Paper>
  );
};

export default CallToAction; 