import { SxProps, Theme } from '@mui/material';

export interface AdminCouponPageStylesType {
  header: SxProps<Theme>;
  errorPlaceholder: SxProps<Theme>;
}

export const adminCouponPageStyles: AdminCouponPageStylesType = {
  header: {
    mb: 2
  },
  errorPlaceholder: {
    height: '200px'
  }
}; 