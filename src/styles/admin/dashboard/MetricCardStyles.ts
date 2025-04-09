import { SxProps, Theme } from '@mui/material';

export const metricCardStyles: {
  paper: SxProps<Theme>;
  link: SxProps<Theme>;
  subtitleText: SxProps<Theme>;
  paperWithLink: SxProps<Theme>;
} = {
  paper: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    flexGrow: 1
  },
  subtitleText: {
    mt: 1
  },
  paperWithLink: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    cursor: 'pointer'
  }
}; 