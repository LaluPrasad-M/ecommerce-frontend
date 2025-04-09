import { SxProps, Theme } from '@mui/material';

export const orderStatusMetricsStyles: {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  progressBar: (color: string) => SxProps<Theme>;
  statusRow: SxProps<Theme>;
  statusLabel: SxProps<Theme>;
} = {
  container: {
    p: 3, 
    width: '100%'
  },
  header: {
    mb: 2
  },
  progressBar: (color: string) => ({
    height: 8, 
    borderRadius: 1,
    backgroundColor: 'grey.200',
    '& .MuiLinearProgress-bar': {
      backgroundColor: color
    }
  }),
  statusRow: {
    display: 'flex', 
    justifyContent: 'space-between', 
    mb: 0.5
  },
  statusLabel: {
    textDecoration: 'none', 
    color: 'inherit'
  }
}; 