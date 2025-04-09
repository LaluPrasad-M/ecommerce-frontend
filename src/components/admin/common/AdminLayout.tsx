import React from 'react';
import { 
  Container, 
  Box, 
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import NotificationSnackbar from '../../shared/NotificationSnackbar';
import { adminLayoutStyles } from '../../../styles/admin/common';
import { AdminLayoutProps } from '../../../types';

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  loading = false,
  fullWidth = false,
  noPadding = false,
  notification
}) => {
  return (
    <Container maxWidth={fullWidth ? false : "lg"}>
      <Box sx={adminLayoutStyles.headerBox}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
      </Box>
      
      <Paper sx={adminLayoutStyles.contentPaper(noPadding)}>
        {loading && (
          <Box sx={adminLayoutStyles.loadingOverlay}>
            <CircularProgress />
          </Box>
        )}
        {children}
      </Paper>
      
      {notification && (
        <NotificationSnackbar
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={notification.onClose}
        />
      )}
    </Container>
  );
};

export default AdminLayout; 