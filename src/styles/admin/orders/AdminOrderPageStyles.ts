import { SxProps, Theme } from '@mui/material';

export interface AdminOrderPageStylesType {
  header: SxProps<Theme>;
  container: SxProps<Theme>;
  filterContainer: SxProps<Theme>;
  ordersContainer: SxProps<Theme>;
  pagination: SxProps<Theme>;
  errorPlaceholder: SxProps<Theme>;
}

export const adminOrderPageStyles: AdminOrderPageStylesType = {
  header: {
    mb: 2
  },
  container: {
    mb: 4
  },
  filterContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    gap: 2,
    mb: 3,
    p: 2,
    borderRadius: 1,
    bgcolor: 'background.paper',
    boxShadow: 1
  },
  ordersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    mt: 3
  },
  errorPlaceholder: {
    height: '200px'
  }
}; 