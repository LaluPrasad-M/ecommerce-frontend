import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Paper,
  Chip,
  LinearProgress,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ErrorOutline as StockWarningIcon
} from '@mui/icons-material';
import { CartItemProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateCartItem, removeFromCart } from '../../../features/customer/cart/cartSlice';
import { cartItemStyles } from '../../../styles/customer/cart';

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product, quantity } = item;
  const [confirmRemove, setConfirmRemove] = useState(false);
  
  // Get the updatingItemId from Redux state to show loading indicator
  const { updatingItemId } = useAppSelector(state => state.cart);
  const isUpdating = updatingItemId === product.id;
  
  const handleIncrement = () => {
    // First check if we're already at max stock
    if (quantity >= product.stock || isUpdating) {
      return;
    }
    
    dispatch(updateCartItem({ 
      productId: product.id, 
      quantity: quantity + 1 
    }))
      .unwrap()
      .catch(error => {
        console.error('Failed to update cart item', error);
      });
  };

  const handleDecrement = () => {
    if (quantity > 1 && !isUpdating) {
      dispatch(updateCartItem({ 
        productId: product.id, 
        quantity: quantity - 1 
      }))
        .unwrap()
        .catch(error => {
          console.error('Failed to update cart item', error);
        });
    }
  };

  const handleRemoveConfirm = () => {
    setConfirmRemove(true);
  };
  
  const handleRemoveCancel = () => {
    setConfirmRemove(false);
  };

  const handleRemove = () => {
    setConfirmRemove(false);
    dispatch(removeFromCart(product.id));
  };
  
  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };
  
  // Calculate all derived values
  const subtotal = product.price * quantity;
  const isIncrementDisabled = quantity >= product.stock || isUpdating;
  const isDecrementDisabled = quantity <= 1 || isUpdating;
  const isLowStock = product.stock <= 5 && product.stock > 0;
  const inStock = product.stock > 0;

  return (
    <Card 
      elevation={2}
      sx={inStock ? cartItemStyles.cardInStock(theme) : cartItemStyles.cardOutOfStock(theme)}
    >
      {isUpdating && (
        <LinearProgress sx={cartItemStyles.updateProgress} />
      )}
    
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={cartItemStyles.stack}
        alignItems="center"
      >
        {/* Product Image */}
        <Box onClick={handleProductClick} sx={cartItemStyles.productBox}>
          <Badge 
            badgeContent={quantity} 
            color="primary"
            sx={cartItemStyles.badgeStyles}
          >
            <CardMedia
              component="img"
              height="80"
              width="80"
              image={product.image || 'https://via.placeholder.com/80x80?text=Product'}
              alt={product.name}
              sx={cartItemStyles.productImage(theme)}
            />
          </Badge>
        </Box>
        
        {/* Product Info */}
        <Box sx={cartItemStyles.productInfoBox}>
          <Box sx={cartItemStyles.productInfoHeader}>
            <Typography 
              variant="h6" 
              component="div" 
              onClick={handleProductClick}
              sx={cartItemStyles.productName}
            >
              {product.name}
            </Typography>
            
            <Typography variant="h6" color="primary.main" fontWeight="medium">
              ₹{subtotal.toFixed(2)}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={cartItemStyles.pricePerItem}>
            ₹{product.price.toFixed(2)} per item
          </Typography>
          
          {isLowStock && (
            <Chip
              size="small"
              icon={<StockWarningIcon fontSize="small" />}
              label={`Only ${product.stock} left`}
              color="warning"
              variant="outlined"
              sx={cartItemStyles.stockChip}
            />
          )}
        </Box>
        
        {/* Quantity Controls */}
        <Box sx={cartItemStyles.quantityControls}>
          <Paper 
            elevation={1} 
            sx={cartItemStyles.quantityPaper}
          >
            <IconButton 
              onClick={handleDecrement} 
              disabled={isDecrementDisabled}
              size="small"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            
            <Box sx={cartItemStyles.quantityValue}>
              {quantity}
            </Box>
            
            <IconButton 
              onClick={handleIncrement} 
              disabled={isIncrementDisabled}
              size="small"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Paper>
          
          <Tooltip title="Remove" placement="top">
            <IconButton 
              size="small" 
              color="error"
              onClick={handleRemoveConfirm}
              sx={cartItemStyles.removeIconButton}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      
      {/* Remove confirmation dialog */}
      <Dialog
        open={confirmRemove}
        onClose={handleRemoveCancel}
        PaperProps={{ elevation: 4, sx: cartItemStyles.confirmDialogPaper }}
      >
        <DialogTitle>
          Remove Item
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to remove "{product.name}" from your cart?
          </Typography>
        </DialogContent>
        <DialogActions sx={cartItemStyles.dialogActions}>
          <Button onClick={handleRemoveCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CartItem; 