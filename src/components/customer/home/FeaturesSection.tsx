import React from 'react';
import { Box, Typography, Stack, Paper, useTheme } from '@mui/material';
import { FeaturedPlayList, LocalShipping, Security } from '@mui/icons-material';
import { Feature, featuresSectionStyles } from '../../../styles/customer/home';

const features: Feature[] = [
  {
    title: 'Wide Selection',
    description: 'Explore our diverse range of products from top brands.',
    icon: <FeaturedPlayList fontSize="large" color="primary" />,
  },
  {
    title: 'Fast Shipping',
    description: 'Get your orders delivered quickly right to your doorstep.',
    icon: <LocalShipping fontSize="large" color="primary" />,
  },
  {
    title: 'Secure Payments',
    description: 'Shop with confidence using our secure payment methods.',
    icon: <Security fontSize="large" color="primary" />,
  },
];

const FeaturesSection: React.FC = () => {
  const theme = useTheme();
  const styles = featuresSectionStyles(theme);
  
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={styles.title}>
        Why Choose Us
      </Typography>
      
      <Stack 
        direction={{ xs: 'row', sm: 'row' }} 
        spacing={4}
      >
        {features.map((feature, index) => (
          <Paper 
            key={index} 
            elevation={2} 
            sx={styles.featureCard}
          >
            <Box sx={styles.iconContainer}>
              {feature.icon}
            </Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {feature.description}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default FeaturesSection; 