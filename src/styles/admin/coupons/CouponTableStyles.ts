import { SxProps, Theme } from '@mui/material';

export interface CouponTableStylesType {
  tableContainer: SxProps<Theme>;
  loadingContainer: SxProps<Theme>;
  emptyState: SxProps<Theme>;
  tableHead: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
}

export const couponTableStyles: CouponTableStylesType = {
  tableContainer: {
    boxShadow: 1,
    borderRadius: 1,
    overflow: 'hidden',
    marginTop: 2
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    height: '200px'
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    p: 4,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1
  },
  tableHead: {
    fontWeight: 'bold',
    bgcolor: 'background.paper'
  },
  errorAlert: {
    mb: 2
  }
}; 