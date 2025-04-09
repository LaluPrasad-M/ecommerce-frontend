import { SxProps, Theme } from '@mui/material';

export interface AdminOrdersPageStylesType {
  header: SxProps<Theme>;
  pageTitle: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  emptyContainer: SxProps<Theme>;
  emptyText: SxProps<Theme>;
  ordersList: SxProps<Theme>;
  loadingPlaceholder: SxProps<Theme>;
}

export const adminOrdersPageStyles: AdminOrdersPageStylesType = {
  header: {
    mb: 2
  },
  pageTitle: {
    fontWeight: 'medium'
  },
  errorAlert: {
    mb: 2
  },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
    p: 4
  },
  emptyText: {
    color: 'text.secondary'
  },
  ordersList: {
    '& > *': {
      mb: 2
    }
  },
  loadingPlaceholder: {
    height: '200px'
  }
}; 