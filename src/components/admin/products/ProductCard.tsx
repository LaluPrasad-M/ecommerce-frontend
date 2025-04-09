import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ProductCardProps } from '../../../types';
import { adminProductCardStyles } from '../../../styles/admin/products';

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Paper sx={adminProductCardStyles.paper}>
      <Box sx={adminProductCardStyles.container}>
        {/* Product Image */}
        <Box sx={adminProductCardStyles.imageContainer}>
          {product.image ? (
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={adminProductCardStyles.image}
            />
          ) : (
            <Typography color="text.secondary">No Image</Typography>
          )}
        </Box>
        
        {/* Product Details */}
        <Box sx={adminProductCardStyles.detailsContainer}>
          <Box sx={adminProductCardStyles.headerContainer}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>
            
            <Box>
              <IconButton
                size="small"
                onClick={() => onEdit(product)}
                color="primary"
                sx={adminProductCardStyles.editButton}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(product.id)}
                color="error"
                sx={adminProductCardStyles.deleteButton}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="body2" color="text.secondary" component="span">
                Category:
              </Typography>{' '}
              <Chip 
                label={product.category} 
                size="small"
                sx={adminProductCardStyles.categoryChip}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" component="span">
                Price:
              </Typography>{' '}
              <Typography variant="body1" fontWeight="bold" component="span">
                ₹{product.price.toFixed(2)}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" component="span">
                Stock:
              </Typography>{' '}
              <Typography 
                variant="body1" 
                fontWeight={product.stock <= 5 ? 'bold' : 'medium'}
                color={product.stock <= 5 ? 'error' : 'inherit'}
                component="span"
              >
                {product.stock} {product.stock <= 5 && '(Low Stock)'}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" component="span">
                Status:
              </Typography>{' '}
              <Box 
                component="span" 
                sx={adminProductCardStyles.statusIndicator}
              >
                <Box
                  sx={adminProductCardStyles.statusDot(Boolean(product.isActive))}
                />
                <Typography variant="body2" component="span">
                  {product.isActive ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
            </Box>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={adminProductCardStyles.description}
            >
              {product.description}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCard; 