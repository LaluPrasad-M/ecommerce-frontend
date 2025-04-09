import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Button,
  Divider,
} from '@mui/material';
import { ProductFilterProps } from '../../../types';
import { productFilterStyles } from '../../../styles/customer/product/productFilterStyles';

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  onFilterByCategory,
  onFilterByPriceRange,
  onClearFilters,
  minPrice = 0,
  maxPrice = 5000,
  selectedCategory: initialCategory = 'all',
  currentPriceRange: initialPriceRange,
}) => {
  const [priceRange, setPriceRange] = useState<number[]>(
    initialPriceRange || [minPrice, maxPrice]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  // Update state when props change
  useEffect(() => {
    if (initialPriceRange) {
      setPriceRange(initialPriceRange);
    }
  }, [initialPriceRange]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Update price range when min/max price changes
  useEffect(() => {
    if (!initialPriceRange) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, initialPriceRange]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onFilterByCategory(category);
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handlePriceRangeSubmit = () => {
    onFilterByPriceRange(priceRange[0], priceRange[1]);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([minPrice, maxPrice]);
    onClearFilters();
  };

  return (
    <Paper elevation={1} sx={productFilterStyles.container}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Category Filter */}
      <Box sx={productFilterStyles.filterSection}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
            <FormControlLabel value="all" control={<Radio />} label="All Categories" />
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                value={category}
                control={<Radio />}
                label={category}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={productFilterStyles.divider} />

      {/* Price Range Filter */}
      <Box sx={productFilterStyles.filterSection}>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          step={Math.max(1, Math.floor((maxPrice - minPrice) / 50))}
          aria-labelledby="price-range-slider"
        />
        <Box sx={productFilterStyles.priceDisplay}>
          <Typography variant="body2" color="text.secondary">
            ₹{priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{priceRange[1]}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={handlePriceRangeSubmit}
          sx={productFilterStyles.applyButton}
          fullWidth
        >
          Apply Price Filter
        </Button>
      </Box>

      <Divider sx={productFilterStyles.divider} />

      {/* Clear Filters */}
      <Button variant="outlined" color="secondary" onClick={handleClearFilters} fullWidth>
        Clear All Filters
      </Button>
    </Paper>
  );
};

export default ProductFilter; 