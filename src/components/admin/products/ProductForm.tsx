import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ProductFormProps } from '../../../types';
import { productFormStyles } from '../../../styles/admin/products';

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
  formErrors,
  formMode,
  loading = false,
  handleInputChange,
  handleSelectChange,
  handleBooleanSelectChange
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {formMode === 'add' ? 'Add New Product' : 'Edit Product'}
      </DialogTitle>
      <DialogContent>
        <Box sx={productFormStyles.contentContainer}>
          {/* Left side - Image preview */}
          <Box sx={productFormStyles.imagePreviewContainer}>
            <Box sx={productFormStyles.imageContainer}>
              {formData.image ? (
                <Box 
                  component="img"
                  src={formData.image}
                  alt="Product preview"
                  sx={productFormStyles.previewImage}
                />
              ) : (
                <Typography color="text.secondary">Image Preview</Typography>
              )}
            </Box>
            
            <TextField
              required
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              error={!!formErrors.image}
              helperText={formErrors.image}
              size="small"
            />
          </Box>
          
          {/* Right side - Product details */}
          <Box sx={productFormStyles.productDetails}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Price (₹)"
              name="price"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              value={formData.price}
              onChange={handleInputChange}
              error={!!formErrors.price}
              helperText={formErrors.price}
            />
            
            <FormControl fullWidth margin="normal" required error={!!formErrors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleSelectChange}
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="home">Home & Kitchen</MenuItem>
                <MenuItem value="beauty">Beauty & Personal Care</MenuItem>
                <MenuItem value="sports">Sports & Outdoors</MenuItem>
                <MenuItem value="toys">Toys & Games</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {formErrors.category && (
                <Typography variant="caption" color="error">
                  {formErrors.category}
                </Typography>
              )}
            </FormControl>
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.stock}
              onChange={handleInputChange}
              error={!!formErrors.stock}
              helperText={formErrors.stock}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="isActive"
                value={formData.isActive ? 'true' : 'false'}
                label="Status"
                onChange={handleBooleanSelectChange}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : formMode === 'add' ? 'Add Product' : 'Update Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm; 