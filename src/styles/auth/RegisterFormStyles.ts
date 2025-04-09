import { SxProps, Theme } from '@mui/material';

export interface RegisterFormStylesType {
  container: SxProps<Theme>;
  paper: SxProps<Theme>;
  title: SxProps<Theme>;
  error: SxProps<Theme>;
  form: SxProps<Theme>;
  formStack: SxProps<Theme>;
  submitButton: SxProps<Theme>;
}

export const registerFormStyles: RegisterFormStylesType = {
  container: {
    maxWidth: 'sm'
  },
  paper: { 
    p: 4, 
    mt: 4 
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
    mt: 2 
  },
  formStack: {
    spacing: 2
  },
  submitButton: { 
    mt: 3, 
    mb: 2 
  }
}; 