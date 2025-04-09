import { SxProps, Theme } from '@mui/material';

export interface LoginFormStylesType {
  container: SxProps<Theme>;
  paper: SxProps<Theme>;
  title: SxProps<Theme>;
  error: SxProps<Theme>;
  form: SxProps<Theme>;
  adminToggle: SxProps<Theme>;
  submitButton: SxProps<Theme>;
}

export const loginFormStyles: LoginFormStylesType = {
  container: {
    maxWidth: 'xs'
  },
  paper: { 
    p: 4, 
    mt: 8 
  },
  title: {
    mb: 2,
    textAlign: 'center'
  },
  error: { 
    mb: 2,
    textAlign: 'center'
  },
  form: { 
    mt: 1 
  },
  adminToggle: { 
    mb: 2, 
    width: '100%' 
  },
  submitButton: { 
    mt: 3, 
    mb: 2 
  }
}; 