import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { Storefront } from '@mui/icons-material';
import profileImage from '../../../assets/images/profile.png';
import { heroSectionStyles } from '../../../styles/customer/home';

const HeroSection: React.FC = () => {
  return (
    <Box sx={heroSectionStyles.container}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Box sx={heroSectionStyles.contentBox}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              lineHeight: 1.2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' }
            }}
          >
            Your One-Stop Shop for Awesome Stuff
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            From gadgets to gear, this project demo brings you a clean and responsive shopping experience.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={RouterLink}
            to="/products"
            endIcon={<Storefront />}
            sx={heroSectionStyles.shopButton}
          >
            Let's Go Shopping
          </Button>
        </Box>
        <Box sx={heroSectionStyles.imageBox}>
          <Box
            component="img"
            src={profileImage}
            alt="Hero"
            sx={heroSectionStyles.heroImage}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default HeroSection; 