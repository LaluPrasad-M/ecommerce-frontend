import { SxProps, Theme } from '@mui/material';

export interface AdminProductPageStylesType {
  header: SxProps<Theme>;
  container: SxProps<Theme>;
  filterContainer: SxProps<Theme>;
  productsContainer: SxProps<Theme>;
  pagination: SxProps<Theme>;
  errorPlaceholder: SxProps<Theme>;
  // Admin products page styles
  headerContainer: SxProps<Theme>;
  pageTitle: SxProps<Theme>;
  addButton: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  emptyContainer: SxProps<Theme>;
  emptyText: SxProps<Theme>;
  productsList: SxProps<Theme>;
}

export const adminProductPageStyles: AdminProductPageStylesType = {
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
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)'
    },
    gap: 2
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    mt: 3
  },
  errorPlaceholder: {
    height: '200px'
  },
  // Admin products page styles
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2
  },
  pageTitle: {
    fontWeight: 'medium'
  },
  addButton: {
    textTransform: 'none'
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
  productsList: {
    '& > *': {
      mb: 2
    }
  }
}; 