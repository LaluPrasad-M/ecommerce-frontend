import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Zoom,
} from '@mui/material';
import { 
  ShoppingCart,
  Close as CloseIcon
} from '@mui/icons-material';
import { CustomerProductCardProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addToCart } from '../../../features/customer/cart/cartSlice';
import { addNotification } from '../../../features/ui/uiSlice';
import { customerProductCardStyles } from '../../../styles/customer/product';

const ProductCard: React.FC<CustomerProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      dispatch(addNotification({
        message: 'Please login to add items to cart',
        type: 'warning'
      }));
      return;
    }
    
    try {
      await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
      dispatch(addNotification({
        message: 'Product added to cart successfully',
        type: 'success'
      }));
    } catch (error) {
      dispatch(addNotification({
        message: typeof error === 'string' ? error : 'Failed to add product to cart',
        type: 'error'
      }));
    }
  };
  
  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };
  
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreviewOpen(true);
  };
  
  const handleCloseImagePreview = () => {
    setImagePreviewOpen(false);
  };

  return (
    <Card sx={customerProductCardStyles.card}>
      <CardMedia
        component="img"
        image={product.image || '/assets/product-placeholder.png'}
        alt={product.name}
        height={200}
        sx={customerProductCardStyles.cardMedia}
        onClick={handleImageClick}
      />
      
      {/* Image Preview Dialog */}
      <Dialog
        open={imagePreviewOpen}
        onClose={handleCloseImagePreview}
        maxWidth="lg"
        TransitionComponent={Zoom}
      >
        <DialogContent sx={customerProductCardStyles.previewDialogContent}>
          <IconButton
            onClick={handleCloseImagePreview}
            sx={customerProductCardStyles.closePreviewButton}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={product.image || 'https://via.placeholder.com/800x600?text=Product'}
            alt={product.name}
            style={customerProductCardStyles.previewImage}
          />
        </DialogContent>
      </Dialog>
      
      <CardContent sx={customerProductCardStyles.cardContent}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={customerProductCardStyles.description}>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </Typography>
        
        <Box sx={customerProductCardStyles.priceContainer}>
          <Typography variant="h6" component="div" color="primary.main" sx={customerProductCardStyles.price}>
            ₹{product.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={customerProductCardStyles.cardActions}>
        <Button 
          size="small" 
          onClick={handleViewDetails}
          sx={customerProductCardStyles.viewDetailsButton}
        >
          View Details
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          sx={customerProductCardStyles.addToCartButton}
        >
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 