import React, { useEffect, useMemo } from 'react';
import { Container, Typography, Box, CircularProgress, Paper, Button } from '@mui/material';
import { SearchOff, FilterAltOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchProducts,
  fetchCategories,
  filterProductsByCategory,
  filterProductsByPriceRange,
  clearProductFilters,
} from '../../../features/customer/products/productsSlice';
import ProductCard from '../../../components/customer/product/ProductCard';
import ProductFilter from '../../../components/customer/product/ProductFilter';
import { productGridStyles, productsPageStyles } from '../../../styles/customer/product/productStyles';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    products, 
    filteredProducts, 
    categories, 
    loading,
    activeFilters 
  } = useAppSelector(state => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  
  // Calculate min and max prices from products
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) {
      return { minPrice: 0, maxPrice: 5000 }; // Default values
    }
    
    const prices = products.map(product => product.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Check if filters are active
  const areFiltersActive = useMemo(() => {
    return (
      activeFilters.category !== 'all' || 
      activeFilters.priceRange.min > minPrice ||
      activeFilters.priceRange.max < maxPrice
    );
  }, [activeFilters, minPrice, maxPrice]);
  
  const handleFilterByCategory = (category: string) => {
    dispatch(filterProductsByCategory(category));
  };
  
  const handleFilterByPriceRange = (min: number, max: number) => {
    dispatch(filterProductsByPriceRange({ min, max }));
  };
  
  const handleClearFilters = () => {
    dispatch(clearProductFilters());
  };
  
  // Determine which products to display
  const displayProducts = useMemo(() => {
    if (areFiltersActive) {
      return filteredProducts; // If filters are active, use filtered results (even if empty)
    }
    return products; // Otherwise show all products
  }, [areFiltersActive, filteredProducts, products]);
  
  return (
    <Container>
      <Box sx={productsPageStyles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Typography variant="subtitle1" sx={productsPageStyles.subtitle}>
          {displayProducts.length} products found
          {areFiltersActive && ' with current filters'}
        </Typography>
      </Box>
      
      <Box sx={productsPageStyles.container}>
        {/* Filters */}
        <Box sx={productsPageStyles.filterContainer}>
          <ProductFilter
            categories={categories}
            onFilterByCategory={handleFilterByCategory}
            onFilterByPriceRange={handleFilterByPriceRange}
            onClearFilters={handleClearFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
            selectedCategory={activeFilters?.category || 'all'}
            currentPriceRange={[
              activeFilters?.priceRange?.min || minPrice,
              activeFilters?.priceRange?.max || maxPrice
            ]}
          />
        </Box>
        
        {/* Products */}
        <Box sx={productsPageStyles.productsContainer}>
          {loading ? (
            <Box sx={productGridStyles.loadingContainer}>
              <CircularProgress />
            </Box>
          ) : (areFiltersActive && displayProducts.length === 0) ? (
            <Paper elevation={3} sx={productsPageStyles.noResultsPaper}>
              <Box sx={productsPageStyles.noResultsIconContainer}>
                <SearchOff sx={productsPageStyles.noResultsIcon} />
              </Box>
              <Typography variant="h5" gutterBottom color="text.primary">
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={productsPageStyles.noResultsText}>
                We couldn't find any products matching your current filters. Try adjusting your category or price range.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<FilterAltOff />}
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
            </Paper>
          ) : (
            <Box sx={productGridStyles.gridContainer}>
              {displayProducts.map((product) => (
                <Box key={product.id} sx={productGridStyles.gridItem}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsPage; 