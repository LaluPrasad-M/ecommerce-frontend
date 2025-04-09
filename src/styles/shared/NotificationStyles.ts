import { SxProps, Theme } from '@mui/material';

export interface NotificationStylesType {
  alert: SxProps<Theme>;
  stack: SxProps<Theme>;
  snackbar: SxProps<Theme>;
}

export const notificationStyles: NotificationStylesType = {
  alert: { 
    width: '100%' 
  },
  stack: {
    position: 'fixed',
    top: 16,
    right: 16,
    zIndex: 2000,
    maxWidth: 350
  },
  snackbar: {
    position: 'static',
    mb: 2
  }
};
