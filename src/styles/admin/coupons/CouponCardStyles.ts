import { SxProps, Theme } from '@mui/material';

export const couponCardStyles: {
  tableRow: SxProps<Theme>;
  statusChip: (isActive: boolean) => SxProps<Theme>;
  tableCell: SxProps<Theme>;
  actions: SxProps<Theme>;
} = {
  tableRow: {
    '&:hover': {
      backgroundColor: 'action.hover'
    }
  },
  statusChip: (isActive: boolean) => ({
    backgroundColor: isActive ? 'success.main' : 'error.main',
    color: 'common.white',
    fontWeight: 'medium'
  }),
  tableCell: {
    padding: 1.5
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1
  }
}; 