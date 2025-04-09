import { SxProps, Theme } from '@mui/material';

export interface HeroSectionStylesType {
  container: SxProps<Theme>;
  contentBox: SxProps<Theme>;
  shopButton: SxProps<Theme>;
  imageBox: SxProps<Theme>;
  heroImage: SxProps<Theme>;
}

export const heroSectionStyles: HeroSectionStylesType = {
  container: {
    py: 8
  },
  contentBox: {
    width: { xs: '100%', md: '50%' }
  },
  shopButton: {
    mt: 2
  },
  imageBox: {
    width: { xs: '100%', md: '50%' }
  },
  heroImage: {
    width: '100%',
    borderRadius: 50,
    boxShadow: 10
  }
}; 