import { SxProps, Theme } from '@mui/material';

export interface AuthPageStylesType {
  container: (maxWidth: 'xs' | 'md') => SxProps<Theme>;
  mainBox: SxProps<Theme>;
  paper: SxProps<Theme>;
  title: SxProps<Theme>;
  linksStack: (justifyContent: 'space-between' | 'center') => SxProps<Theme>;
}

export const authPageStyles: AuthPageStylesType = {
  container: (maxWidth) => ({
    maxWidth
  }),
  mainBox: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    p: 4,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: 2
  },
  linksStack: (justifyContent) => ({
    direction: 'row',
    justifyContent,
    width: '100%', 
    mt: 3
  })
}; 