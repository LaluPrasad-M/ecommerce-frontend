import { SxProps, Theme } from '@mui/material';

export interface StatusUpdateDialogStylesType {
  dialogContent: SxProps<Theme>;
  formControl: SxProps<Theme>;
  dialogTitle: SxProps<Theme>;
  loadingSpinner: {
    size: number;
  };
}

export const statusUpdateDialogStyles: StatusUpdateDialogStylesType = {
  dialogContent: {
    minWidth: '300px',
    pt: 1
  },
  formControl: {
    mt: 1,
    minWidth: '100%'
  },
  dialogTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  loadingSpinner: {
    size: 24
  }
}; 