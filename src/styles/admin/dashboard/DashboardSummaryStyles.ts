import { SxProps, Theme } from '@mui/material';

export interface DashboardSummaryStylesType {
  container: SxProps<Theme>;
  stackContainer: SxProps<Theme>;
  metricsBox: SxProps<Theme>;
  statusBox: SxProps<Theme>;
}

export const dashboardSummaryStyles: DashboardSummaryStylesType = {
  container: { 
    width: '100%' 
  },
  stackContainer: { 
    spacing: 3 
  },
  metricsBox: {
    width: '100%'
  },
  statusBox: { 
    width: '100%' 
  }
}; 