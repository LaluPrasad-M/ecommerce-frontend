import { SxProps, Theme } from '@mui/material';

export interface CartPageStylesType {
  container: SxProps<Theme>;
  headerBox: SxProps<Theme>;
  headerTitle: SxProps<Theme>;
  headerSubtitle: SxProps<Theme>;
  divider: SxProps<Theme>;
  loaderBox: SxProps<Theme>;
  emptyCartPaper: SxProps<Theme>;
  emptyCartTitle: SxProps<Theme>;
  emptyCartText: SxProps<Theme>;
  browseButton: SxProps<Theme>;
  itemsContainer: SxProps<Theme>;
  cartItemsBox: SxProps<Theme>;
  cartActionsBox: SxProps<Theme>;
  summaryBox: SxProps<Theme>;
  skeletonText: SxProps<Theme>;
  emptyCartIcon: SxProps<Theme>;
  cartIcon: SxProps<Theme>;
  cartPaper: SxProps<Theme>;
  proceedBtn: SxProps<Theme>;
}

export const cartPageStyles: CartPageStylesType = {
  container: {
    py: 4
  },
  headerBox: {
    mb: 4
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  headerSubtitle: {
    mt: 1,
    color: 'text.secondary'
  },
  divider: {
    mb: 4
  },
  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    my: 4
  },
  emptyCartPaper: {
    p: 4,
    textAlign: 'center',
    borderRadius: 2,
    boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 20px 0 rgba(0,0,0,0.12)' : '0 4px 20px 0 rgba(0,0,0,0.08)'
  },
  emptyCartTitle: {
    fontWeight: 'bold',
    mb: 1
  },
  emptyCartText: {
    color: 'text.secondary',
    mb: 2
  },
  browseButton: {
    mt: 2,
    py: 1.5,
    px: 3,
    borderRadius: 2
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 4
  },
  cartItemsBox: {
    width: { xs: '100%', md: '66.66%' }
  },
  cartActionsBox: {
    mt: 4,
    display: 'flex',
    justifyContent: 'space-between'
  },
  summaryBox: {
    width: { xs: '100%', md: '33.33%' }
  },
  skeletonText: {
    mt: 1
  },
  emptyCartIcon: {
    mb: 2, 
    fontSize: 60, 
    opacity: 0.6
  },
  cartIcon: {
    mr: 1
  },
  cartPaper: {
    borderRadius: 1
  },
  proceedBtn: {
    mt: 2
  }
}; 