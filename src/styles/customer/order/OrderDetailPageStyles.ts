import { SxProps, Theme } from '@mui/material';

export interface OrderDetailPageStylesType {
  container: SxProps<Theme>;
  backButtonBox: SxProps<Theme>;
  skeletonContainer: SxProps<Theme>;
  headerBox: SxProps<Theme>;
  contentBox: SxProps<Theme>;
  flexBox: SxProps<Theme>;
  paperContainer: SxProps<Theme>;
  skeletonRow: SxProps<Theme>;
  skeletonText: SxProps<Theme>;
  alertAction: SxProps<Theme>;
  errorPaper: SxProps<Theme>;
  notFoundPaper: SxProps<Theme>;
  actionButton: SxProps<Theme>;
}

export const orderDetailPageStyles: OrderDetailPageStylesType = {
  container: {
    py: 4
  },
  backButtonBox: {
    mb: 3,
    display: 'flex',
    alignItems: 'center'
  },
  skeletonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2
  },
  headerBox: {
    mb: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentBox: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 3
  },
  flexBox: {
    flex: 1
  },
  paperContainer: {
    p: 3,
    mb: 3
  },
  skeletonRow: {
    mb: 2
  },
  skeletonText: {
    mb: 3
  },
  alertAction: {
    mb: 3
  },
  errorPaper: {
    p: 3,
    textAlign: 'center'
  },
  notFoundPaper: {
    p: 4,
    textAlign: 'center'
  },
  actionButton: {
    mt: 2
  }
}; 