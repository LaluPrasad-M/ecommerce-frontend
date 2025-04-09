import { SxProps, Theme } from '@mui/material';

export interface OrdersPageStylesType {
  headerBox: SxProps<Theme>;
  divider: SxProps<Theme>;
  emptyOrdersPaper: SxProps<Theme>;
  browseButton: SxProps<Theme>;
}

export const ordersPageStyles: OrdersPageStylesType = {
  headerBox: {
    mb: 4
  },
  divider: {
    mb: 4
  },
  emptyOrdersPaper: {
    p: 4,
    textAlign: 'center'
  },
  browseButton: {
    mt: 2
  }
}; 