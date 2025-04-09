import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Paper,
  Divider,
  Button,
  useTheme,
  CardMedia,
  Stack,
  Dialog,
  DialogContent,
  Zoom
} from '@mui/material';
import {
  Edit as EditIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Inventory as InventoryIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { OrderStatus, OrderItem, OrderCardProps } from '../../../types';
import { formatDate, getThemeBasedStatusColor, formatPrice } from '../../../utils/helpers';
import { orderCardStyles, getStatusIconStyles, getChipIconStyles } from '../../../styles/shared/order';

const OrderCard: React.FC<OrderCardProps> = ({ order, variant, onStatusUpdate }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = orderCardStyles(theme);
  const iconStyles = getStatusIconStyles();
  const [previewImage, setPreviewImage] = useState<{ url: string; name: string } | null>(null);
  
  // Debug logging for date issues
  useEffect(() => {
    if (order && (!order.createdAt || isNaN(new Date(order.createdAt).getTime()))) {
      console.warn('Invalid order date detected:', {
        orderId: order.id,
        createdAt: order.createdAt,
        type: typeof order.createdAt
      });
    }
  }, [order]);
  
  if (!order || !order.items) {
    return (
      <Paper elevation={2} sx={styles.card}>
        <Typography>Loading order...</Typography>
      </Paper>
    );
  }
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Order Placed':
        return <PaymentIcon fontSize="small" sx={iconStyles} />;
      case 'Packed':
        return <InventoryIcon fontSize="small" sx={iconStyles} />;
      case 'Shipping':
        return <ShippingIcon fontSize="small" sx={iconStyles} />;
      case 'Delivered':
        return <DeliveredIcon fontSize="small" sx={iconStyles} />;
      case 'Cancelled':
        return <CancelledIcon fontSize="small" sx={iconStyles} />;
      default:
        return undefined;
    }
  };
  
  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };
  
  const handleImageClick = (e: React.MouseEvent, url: string, name: string) => {
    e.stopPropagation(); // Prevent navigation to product page
    setPreviewImage({ url, name });
  };
  
  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  return (
    <Paper 
      elevation={2}
      sx={styles.card}
    >
      {/* Order Header */}
      <Box sx={styles.orderInfo}>
        <Box sx={styles.orderMeta}>
          <Box sx={styles.orderIdBox}>
            <Typography variant="body2" color="text.secondary">
              Order #{variant === 'admin' ? order.id : (order.id ? order.id.substring(0, 8) : 'N/A')}
            </Typography>
          </Box>
          <Box sx={styles.statusContainer}>
            <Chip 
              icon={getStatusIcon(order.status)}
              label={order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
              size="small"
              sx={{
                ...styles.chip(order.status),
                bgcolor: getThemeBasedStatusColor(order.status, theme.palette.mode),
                ...getChipIconStyles(),
              }}
            />
            {variant === 'admin' && onStatusUpdate && (
              <IconButton
                size="small"
                onClick={() => onStatusUpdate(order)}
                color="primary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Placed on {formatDate(order.createdAt)}
        </Typography>
      </Box>
      
      <Divider sx={styles.divider} />
      
      {/* Image Preview Dialog */}
      <Dialog
        open={Boolean(previewImage)}
        onClose={handleClosePreview}
        maxWidth="lg"
        TransitionComponent={Zoom}
      >
        <DialogContent sx={styles.previewDialogContent}>
          <IconButton
            onClick={handleClosePreview}
            sx={styles.closePreviewButton}
          >
            <CloseIcon />
          </IconButton>
          {previewImage && (
            <img
              src={previewImage.url}
              alt={previewImage.name}
              style={styles.previewImage}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Main content container */}
      <Box sx={styles.contentContainer}>
        {/* Left side - Main Content */}
        <Box sx={styles.mainContent}>
          {/* Customer Info - Admin Only */}
          {variant === 'admin' && (
            <>
              <Box sx={styles.infoSection}>
                <Box sx={styles.customerInfoBox}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                    Customer:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {order.user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.user.mobileNumber}
                  </Typography>
                </Box>
                
                <Box sx={styles.shippingAddressBox}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                    Shipping Address:
                  </Typography>
                  <Typography variant="body1">
                    {order.shippingAddress}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={styles.divider} />
            </>
          )}

          {/* Order Items */}
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Order Items:
          </Typography>
          
          <Box sx={styles.orderDetails}>
            {order.items.map((item: OrderItem, index: number) => {
              // Handle both API response formats
              const productName = item.product?.name || item.name || 'Unknown';
              const productId = item.product?.id || item.id || `item-${index}`;
              const imageUrl = item.image || item.product?.image || 'https://via.placeholder.com/50x50?text=Product';
              
              return (
                <Box 
                  key={productId}
                  sx={styles.orderItem(index === order.items.length - 1)
                  }
                >
                  <Box sx={styles.itemContent}>
                    <Box sx={styles.itemRowBox}>
                      {/* Product Image */}
                      <Box 
                        onClick={() => handleProductClick(productId)}
                        sx={styles.itemImageContainer}
                      >
                        <CardMedia
                          component="img"
                          height="50"
                          width="50"
                          image={imageUrl}
                          alt={productName}
                          onClick={(e) => handleImageClick(e, imageUrl, productName)}
                          sx={styles.productImage}
                        />
                      </Box>
                      
                      {/* Product Info */}
                      <Box sx={styles.productInfoBox}>
                        <Typography 
                          variant="body2"
                          onClick={() => handleProductClick(productId)}
                          sx={styles.productNameText}
                        >
                          {productName}
                        </Typography>
                        
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            {formatPrice(item.price)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={styles.multiplicationSymbol}>
                            ×
                          </Typography>
                          <Chip 
                            label={item.quantity} 
                            size="small" 
                            variant="outlined" 
                            sx={styles.quantityChip} 
                          />
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" fontWeight="medium" color="primary.main">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        
        {/* Right side - Order Summary */}
        <Box sx={styles.summaryBox}>
          <Typography variant="subtitle2" fontWeight="bold" sx={styles.summaryTitle}>
            Order Summary
          </Typography>
          
          <Box sx={styles.summaryRow}>
            <Typography variant='body2' color='text.secondary' fontWeight='bold'>
              Subtotal:
            </Typography>
            <Typography variant='body2'>
              ₹{order.subtotal.toFixed(2)}
            </Typography>
          </Box>
          
          {order.discount > 0 && (
            <Box sx={styles.summaryRow}>
              <Typography variant='body2' color='text.secondary' fontWeight='bold'>
                Discount:
              </Typography>
              <Typography variant='body2' color='success.dark'>
                -₹{order.discount.toFixed(2)}
              </Typography>
            </Box>
          )}
          
          {order.tax > 0 && (
            <Box sx={styles.summaryRow}>
              <Typography variant='body2' color='text.secondary' fontWeight='bold'>
                Tax:
              </Typography>
              <Typography variant='body2'>
                ₹{order.tax.toFixed(2)}
              </Typography>
            </Box>
          )}
          
          <Divider sx={styles.summaryDivider} />
          
          <Box sx={styles.summaryTotal}>
            <Typography variant="subtitle1" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              ₹{order.total.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Action buttons - Customer view only */}
      {variant === 'customer' && (
        <Box sx={styles.actionsBox}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default OrderCard; 