import { SxProps, Theme } from '@mui/material';

export const metricCardStyles: {
  paper: SxProps<Theme>;
  link: SxProps<Theme>;
  subtitleText: SxProps<Theme>;
  paperWithLink: SxProps<Theme>;
} = {
  paper: {
    p: 2,
    height: '100%',
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 2
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  subtitleText: {
    mt: 'auto',
    pt: 1.5
  },
  paperWithLink: {
    p: 2,
    height: '100%',
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    borderRadius: 2,
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 2
    }
  }
}; 