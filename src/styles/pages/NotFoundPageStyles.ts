import { SxProps, Theme } from '@mui/material';

export interface NotFoundPageStylesType {
  container: SxProps<Theme>;
  paper: SxProps<Theme>;
  title: SxProps<Theme>;
  subtitle: SxProps<Theme>;
  message: SxProps<Theme>;
  image: SxProps<Theme>;
  button: SxProps<Theme>;
}

export const notFoundPageStyles: NotFoundPageStylesType = {
  container: {
    maxWidth: 'md'
  },
  paper: { 
    p: 4, 
    mt: 8, 
    borderRadius: 2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: { 
    fontSize: { xs: '6rem', sm: '8rem' },
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    mb: 2
  },
  subtitle: {
    mb: 2
  },
  message: { 
    color: 'text.secondary', 
    maxWidth: 500 
  },
  image: { 
    height: 300, 
    objectFit: 'contain',
    my: 3 
  },
  button: { 
    mt: 2 
  }
}; 