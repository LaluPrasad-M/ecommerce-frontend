import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NotificationSnackbarProps } from '../../types';
import { notificationStyles } from '../../styles/shared/NotificationStyles';

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
  vertical = 'bottom',
  horizontal = 'right'
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={notificationStyles.alert}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar; 