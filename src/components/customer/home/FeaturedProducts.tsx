import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Product } from '../../../types';
import { FeaturedProductsProps } from '../../../types/home';
import { featuredProductsStyles } from '../../../styles/customer/home';
import ProductCard from '../product/ProductCard';

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const theme = useTheme();
  const styles = featuredProductsStyles(theme);
  
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Products
      </Typography>
      <Box sx={styles.productsContainer}>
        {products.map((product: Product) => (
          <Box 
            key={product.id} 
            sx={styles.productItem}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedProducts; 