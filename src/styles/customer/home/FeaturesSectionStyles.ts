import { Theme } from '@mui/material';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FeaturesSectionStylesType {
  container: {
    mb: number;
  };
  title: {
    mb: number;
  };
  featureCard: {
    p: number;
    flex: number;
    textAlign: string;
  };
  iconContainer: {
    mb: number;
  };
}

export const featuresSectionStyles = (theme: Theme): FeaturesSectionStylesType => ({
  container: {
    mb: 6,
  },
  title: {
    mb: 4,
  },
  featureCard: {
    p: 3,
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    mb: 2,
  },
}); 