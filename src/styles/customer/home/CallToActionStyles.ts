import { Theme } from '@mui/material';

export interface CallToActionStylesType {
  container: {
    py: number;
    px: number;
    textAlign: string;
    bgcolor: string;
    color: string;
    borderRadius: number;
  };
  registerButton: {
    mr: number;
  };
}

export const callToActionStyles = (theme: Theme): CallToActionStylesType => ({
  container: {
    py: 6,
    px: 4,
    textAlign: 'center',
    bgcolor: 'secondary.light',
    color: 'text.primary',
    borderRadius: 2,
  },
  registerButton: {
    mr: 2,
  },
}); 