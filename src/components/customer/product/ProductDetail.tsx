import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Fade,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
  CardMedia,
  Zoom,
  Skeleton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  VerifiedUser as VerifiedUserIcon,
  LocalShipping as ShippingIcon,
  CheckCircleOutline as CheckCircleIcon
} from '@mui/icons-material';
import { CustomerProductCardProps } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addToCart } from '../../../features/customer/cart/cartSlice';
import { addNotification } from '../../../features/ui/uiSlice';
import { productDetailStyles } from '../../../styles/customer/product/productDetailStyles';
import { formatDate, formatPrice } from '../../../utils/helpers';

const ProductDetail: React.FC<CustomerProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [loading] = useState(false);
  
  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      dispatch(addNotification({
        message: 'Please log in to add items to your cart',
        type: 'info'
      }));
      navigate('/login');
      return;
    }
    
    // Dispatch add to cart action
    dispatch(addToCart({ productId: product.id, quantity }))
      .unwrap()
      .then(() => {
        // Show success animation
        setAddedToCart(true);
        dispatch(addNotification({
          message: `${product.name} added to your cart`,
          type: 'success',
          duration: 3000
        }));
        
        // Reset animation after 3 seconds
        setTimeout(() => setAddedToCart(false), 3000);
      })
      .catch(error => {
        dispatch(addNotification({
          message: typeof error === 'string' ? error : 'Failed to add product to cart',
          type: 'error'
        }));
      });
  };
  
  const handleImageClick = () => {
    setImagePreviewOpen(true);
  };
  
  const handleCloseImagePreview = () => {
    setImagePreviewOpen(false);
  };
  
  if (!product) {
    return (
      <Box sx={productDetailStyles.errorContainer}>
        <Typography variant="h6" color="error">
          Product not found or has been removed.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Fade in timeout={500}>
      <Paper elevation={3} sx={productDetailStyles.container}>
        <Box sx={productDetailStyles.backButtonContainer}>
          <Button
            variant="outlined"
            component={Link}
            to="/products"
            startIcon={<ArrowBackIcon />}
            size="small"
          >
            Continue Shopping
          </Button>
        </Box>
        <Box sx={productDetailStyles.contentWrapper}>
          {/* Product Image */}
          <Box sx={productDetailStyles.imageContainer}>
            {loading ? (
              <Skeleton variant="rectangular" height={400} width="100%" />
            ) : product.image ? (
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={productDetailStyles.productImage}
                onClick={handleImageClick}
              />
            ) : (
              <Box sx={productDetailStyles.noImageBox}>
                <ImageIcon style={{ fontSize: 100, color: 'grey' }} />
                <Typography color="textSecondary" variant="body2">No image available</Typography>
              </Box>
            )}
          </Box>
          
          {/* Image Preview Dialog */}
          <Dialog
            open={imagePreviewOpen}
            onClose={handleCloseImagePreview}
            maxWidth="lg"
            TransitionComponent={Zoom}
          >
            <DialogContent sx={productDetailStyles.previewDialogContent}>
              <IconButton
                onClick={handleCloseImagePreview}
                sx={productDetailStyles.closePreviewButton}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={product.image || 'https://via.placeholder.com/800x800?text=No+Image'}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
            </DialogContent>
          </Dialog>
  
          {/* Product Details */}
          <Box sx={productDetailStyles.detailsContainer}>
            {/* Product Header */}
            <Box sx={productDetailStyles.headerSection}>
              <Typography variant="h4" component="h1" sx={productDetailStyles.productName}>
                {product.name}
              </Typography>
  
              <Box sx={productDetailStyles.categoryChip}>
                <Chip
                  label={product.category}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
  
            {/* Product Rating */}
            <Box sx={productDetailStyles.ratingContainer}>
              <Rating value={4.5} precision={0.5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={productDetailStyles.reviewCount}>
                4.5 (24 reviews)
              </Typography>
            </Box>
  
            {/* Product Price */}
            <Typography variant="h5" color="primary" sx={productDetailStyles.priceText}>
              {formatPrice(product.price)}
            </Typography>
  
            {/* Stock Status */}
            <Box sx={productDetailStyles.stockStatusContainer}>
              <Typography
                variant="body2"
                color={product.stock > 0 ? 'success.main' : 'error.main'}
                sx={productDetailStyles.stockText}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock.toLocaleString()} available)`
                  : 'Out of Stock'}
              </Typography>
            </Box>

            {/* Creation Date */}
            {product.createdAt && (
              <Typography variant="body2" color="text.secondary" sx={productDetailStyles.creationDateText}>
                Listed on: {formatDate(product.createdAt)}
              </Typography>
            )}
  
            <Divider sx={productDetailStyles.divider} />
  
            {/* Product Description */}
            <Box sx={productDetailStyles.descriptionContainer}>
              <Typography variant="body1" sx={productDetailStyles.descriptionText}>
                {product.description}
              </Typography>
            </Box>
  
            <Divider sx={productDetailStyles.divider} />
  
            {/* Feature Chips */}
            <Box sx={productDetailStyles.featuresContainer}>
              <Tooltip title="Authentic Products">
                <Chip
                  icon={<VerifiedUserIcon />}
                  color="success"
                  label="Authentic"
                  variant="outlined"
                  size="small"
                  sx={productDetailStyles.featureChip}
                />
              </Tooltip>
              <Tooltip title="Fast Delivery">
                <Chip
                  icon={<ShippingIcon />}
                  color="warning"
                  label="Fast Delivery"
                  variant="outlined"
                  size="small"
                  sx={productDetailStyles.featureChip}
                />
              </Tooltip>
              {product.isActive && (
                <Tooltip title="Currently Active">
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Active Product"
                    color="success"
                    size="small"
                    variant="outlined"
                    sx={productDetailStyles.featureChip}
                  />
                </Tooltip>
              )}
            </Box>
  
            {/* Quantity Selector */}
            {product.stock > 0 && (
              <Box sx={productDetailStyles.quantityContainer}>
                <Typography variant="body2" sx={productDetailStyles.quantityLabel}>
                  Quantity:
                </Typography>
                <Box sx={productDetailStyles.quantityControls}>
                  <Paper 
                    elevation={1} 
                    sx={productDetailStyles.quantityControlsPaper}
                  >
                    <IconButton 
                      onClick={handleDecrement} 
                      disabled={quantity <= 1}
                      size="small"
                      color="primary"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    
                    <Box sx={quantity >= 1000 ? 
                      productDetailStyles.quantityValueWide : 
                      productDetailStyles.quantityValue}>
                      {quantity}
                    </Box>
                    
                    <IconButton 
                      onClick={handleIncrement} 
                      disabled={quantity >= product.stock}
                      size="small"
                      color="primary"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>
            )}
  
            {/* Add to Cart Button */}
            <Box sx={productDetailStyles.actionContainer}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                sx={productDetailStyles.addToCartButton}
              >
                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </Box>
  
            {addedToCart && (
              <Fade in timeout={500}>
                <Paper elevation={3} sx={productDetailStyles.successMessage}>
                  <strong>{product.name}</strong> has been added to your cart successfully!
                </Paper>
              </Fade>
            )}
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ProductDetail; 