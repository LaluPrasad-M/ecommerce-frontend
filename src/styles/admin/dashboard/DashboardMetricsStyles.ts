import { SxProps, Theme } from '@mui/material';

export const dashboardMetricsStyles: {
  container: SxProps<Theme>;
} = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: { xs: 2, sm: 3 },
    width: '100%',
    justifyContent: 'space-between'
  }
}; 