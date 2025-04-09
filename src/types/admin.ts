export interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  loading?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
  notification?: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
  };
}

export interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
  itemName?: string;
} 