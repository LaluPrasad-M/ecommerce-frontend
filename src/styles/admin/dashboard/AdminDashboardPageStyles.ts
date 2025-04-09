import { SxProps, Theme } from '@mui/material';

export interface AdminDashboardPageStylesType {
  container: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
}

export const adminDashboardPageStyles: AdminDashboardPageStylesType = {
  container: {
    width: '100%'
  },
  errorAlert: {
    mb: 2
  }
}; 