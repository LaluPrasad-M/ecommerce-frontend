import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';
import { metricCardStyles } from '../../../styles/admin/dashboard';
import { MetricCardProps } from '../../../types';

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  linkTo
}) => {
  const content = (
    <Paper sx={linkTo ? metricCardStyles.paperWithLink : metricCardStyles.paper}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3">
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={metricCardStyles.subtitleText}>
          {subtitle}
        </Typography>
      )}
    </Paper>
  );

  if (linkTo) {
    return (
      <Box 
        component={Link} 
        to={linkTo}
        sx={metricCardStyles.link}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default MetricCard; 