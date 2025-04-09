import React, { useEffect } from 'react';
import { Snackbar, Alert, AlertColor, Stack } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeNotification } from '../../features/ui/uiSlice';
import { notificationStyles } from '../../styles/shared/NotificationStyles';

// Show System Notifications
const NotificationSystem: React.FC = () => {
  const { notifications } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  
  const handleClose = (id: string) => {
    dispatch(removeNotification(id));
  };
  
  // Set up automatic removal of notifications based on their duration
  useEffect(() => {
    if (notifications.length > 0) {
      const timers = notifications.map(notification => {
        const duration = notification.duration || 5000; // Default to 5 seconds
        return setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, duration);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [notifications, dispatch]);
  
  if (notifications.length === 0) {
    return null;
  }
  
  return (
    <Stack spacing={2} sx={notificationStyles.stack}>
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => handleClose(notification.id)}
          sx={notificationStyles.snackbar}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type as AlertColor}
            variant="filled"
            elevation={6}
            sx={notificationStyles.alert}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default NotificationSystem; 