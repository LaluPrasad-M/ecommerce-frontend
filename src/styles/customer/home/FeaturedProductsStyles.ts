import { Theme } from '@mui/material';

export interface FeaturedProductsStylesType {
  container: {
    py: number;
  };
  productsContainer: {
    display: string;
    flexWrap: string;
    margin: number;
  };
  productItem: {
    width: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    padding: number;
  };
}

export const featuredProductsStyles = (theme: Theme): FeaturedProductsStylesType => ({
  container: {
    py: 8,
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: -2,
  },
  productItem: {
    width: {
      xs: '100%',
      sm: '50%',
      md: '33.333%',
      lg: '25%',
    },
    padding: 2,
  },
}); 