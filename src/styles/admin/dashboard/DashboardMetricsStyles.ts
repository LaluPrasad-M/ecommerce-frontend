import { SxProps, Theme } from '@mui/material';

export const dashboardMetricsStyles: {
  container: SxProps<Theme>;
} = {
  container: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
    gap: { xs: 2, sm: 3 },
    width: '100%',
    mb: 3
  }
}; 