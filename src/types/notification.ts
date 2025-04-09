export interface NotificationSnackbarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
    autoHideDuration?: number;
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
  }

  export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    duration?: number; // in milliseconds
  }
  