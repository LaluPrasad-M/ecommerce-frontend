import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Zoom,
  Fade,
  Collapse,
  Alert,
  IconButton,
  CircularProgress,
  CardMedia,
  SxProps,
  Theme,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Inventory as InventoryIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  Receipt as ReceiptIcon,
  Info as InfoIcon,
  ShoppingBag as ProductIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { OrderDetailProps, OrderStatus } from '../../../types';
import { formatDate, formatPrice } from '../../../utils/helpers';
import { orderDetailStyles, getOrderDetailChipStyles } from '../../../styles/customer/order';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cancelOrder } from '../../../features/customer/orders/ordersSlice';
import { useNavigate } from 'react-router-dom';

const OrderDetail: React.FC<OrderDetailProps> = ({ order: initialOrder }) => {
  const [order, setOrder] = useState(initialOrder);
  const theme = useTheme();
  const styles = orderDetailStyles(theme);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [itemsExpanded, setItemsExpanded] = useState(true);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; name: string } | null>(null);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading: cancelLoading } = useAppSelector(state => state.orders);
  
  // Update order when initialOrder changes
  useEffect(() => {
    setOrder(initialOrder);
  }, [initialOrder]);
  
  // Add debug logging for date issues
  useEffect(() => {
    if (order && (!order.createdAt || isNaN(new Date(order.createdAt).getTime()))) {
      console.warn('Invalid order date detected in OrderDetail:', {
        orderId: order.id,
        createdAt: order.createdAt,
        type: typeof order.createdAt
      });
    }
  }, [order]);
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Order Placed':
        return <PaymentIcon fontSize="small" sx={styles.statusIcon} />;
      case 'Packed':
        return <InventoryIcon fontSize="small" sx={styles.statusIcon} />;
      case 'Shipping':
        return <ShippingIcon fontSize="small" sx={styles.statusIcon} />;
      case 'Delivered':
        return <DeliveredIcon fontSize="small" sx={styles.statusIcon} />;
      case 'Cancelled':
        return <CancelledIcon fontSize="small" sx={styles.statusIcon} />;
      default:
        return undefined;
    }
  };
  
  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };
  
  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };
  
  const handleConfirmCancel = async () => {
    try {
      setCancelError(null);
      const updatedOrder = await dispatch(cancelOrder(order.id)).unwrap();
      setOrder(updatedOrder);
      setCancelDialogOpen(false);
    } catch (error) {
      console.error('Error cancelling order:', error);
      setCancelError(typeof error === 'string' ? error : 'Failed to cancel order');
      // Keep dialog open on error
    }
  };
  
  const toggleItemsExpanded = () => {
    setItemsExpanded(!itemsExpanded);
  };
  
  // Define steps for order progress
  const steps = [
    { label: 'Order Placed', value: 'Order Placed' },
    { label: 'Packed', value: 'Packed' },
    { label: 'Shipping', value: 'Shipping' },
    { label: 'Delivered', value: 'Delivered' },
  ];
  
  const getActiveStep = () => {
    if (order.status === 'Cancelled') return -1;
    return steps.findIndex(step => step.value === order.status);
  };
  
  const getStatusDescription = (status: OrderStatus) => {
    switch (status) {
      case 'Order Placed':
        return 'Your order has been received and is being processed.';
      case 'Packed':
        return 'Your order has been packed and is ready for shipping.';
      case 'Shipping':
        return 'Your order is on its way to you!';
      case 'Delivered':
        return 'Your order has been delivered successfully.';
      case 'Cancelled':
        return 'This order has been cancelled.';
      default:
        return '';
    }
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
    <Fade in={true} timeout={300}>
      <Box sx={styles.container}>
        {/* Order Header Card */}
        <Paper elevation={3} sx={styles.headerPaper}>
          <Box sx={styles.headerBox}>
            <Box>
              <Typography variant="h5" component="h1" fontWeight="bold">
                Order #{order.id.substring(0, 8)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Placed on {formatDate(order.createdAt)}
              </Typography>
            </Box>
            <Tooltip 
              title={getStatusDescription(order.status)} 
              arrow 
              placement="top"
              TransitionComponent={Zoom}
            >
              <Chip
                icon={getStatusIcon(order.status)}
                label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                sx={
                  {
                    ...styles.orderStatusChip(order.status, theme),
                    ...getOrderDetailChipStyles(order.status, theme)
                  } as SxProps<Theme>
                }
              />
            </Tooltip>
          </Box>
          
          <Box sx={styles.infoSection}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={styles.flexBox}>
                <Card variant="outlined" sx={styles.equalHeightCard}>
                  <CardContent>
                    <Box sx={styles.iconWithText}>
                      <InfoIcon fontSize="small" color="primary" sx={styles.infoIcon} />
                      <Typography variant="subtitle2" color="text.secondary">Order Date</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">{formatDate(order.createdAt)}</Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={styles.flexBox}>
                <Card variant="outlined" sx={styles.equalHeightCard}>
                  <CardContent>
                    <Box sx={styles.iconWithText}>
                      <ReceiptIcon fontSize="small" color="primary" sx={styles.infoIcon} />
                      <Typography variant="subtitle2" color="text.secondary">Total Amount</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="bold" color="primary.main">
                      {formatPrice(order.total)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={styles.flexBox}>
                <Card variant="outlined" sx={styles.equalHeightCard}>
                  <CardContent>
                    <Box sx={styles.iconWithText}>
                      <ProductIcon fontSize="small" color="primary" sx={styles.infoIcon} />
                      <Typography variant="subtitle2" color="text.secondary">Items</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </Box>
        </Paper>
        
        {/* Order Progress Section */}
        {order.status !== 'Cancelled' ? (
          <Paper elevation={3} sx={styles.progressPaper}>
            <Box sx={styles.iconWithText}>
              <Typography variant="h6" fontWeight="bold">Order Progress</Typography>
              <Tooltip title="Track your order status" arrow placement="top">
                <InfoIcon fontSize="small" color="primary" sx={styles.infoIcon} />
              </Tooltip>
            </Box>
            
            <Stepper 
              activeStep={getActiveStep()} 
              alternativeLabel
              sx={styles.orderProgress}
            >
              {steps.map((step) => (
                <Step key={step.value}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Collapse in={order.status === 'Delivered'}>
              <Alert 
                severity="success" 
                sx={styles.alertMessageCentered}
              >
                Your order has been delivered successfully!
              </Alert>
            </Collapse>
            
            {['Order Placed', 'Packed', 'Shipping'].includes(order.status) && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={styles.statusMessageText}>
                  Need to change your plans? You can cancel your order before delivery.
                </Typography>
                <Box sx={styles.cancelButtonContainer}>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleOpenCancelDialog}
                    startIcon={<CancelledIcon />}
                    disabled={cancelLoading}
                    sx={styles.cancelButton}
                  >
                    {cancelLoading ? 'Cancelling...' : 'Cancel Order'}
                  </Button>
                </Box>
                {cancelError && (
                  <Alert severity="error" sx={styles.errorAlert}>
                    {cancelError}
                  </Alert>
                )}
              </Box>
            )}
          </Paper>
        ) : (
          <Paper elevation={3} sx={styles.progressPaper}>
            <Box sx={styles.cancelledStatusBox}>
              <CancelledIcon color="error" sx={styles.cancelIcon} />
              <Typography color="error.main" variant="h6">Order Cancelled</Typography>
            </Box>
            <Alert severity="error" sx={styles.cancelledAlert}>
              This order has been cancelled and will not be processed further.
            </Alert>
          </Paper>
        )}
        
        {/* Order Items Section */}
        <Paper elevation={3} sx={styles.itemsPaper}>
          <Box 
            sx={{
              ...styles.collapsibleHeader,
              '&:hover': styles.collapsibleHeaderHover
            }}
            onClick={toggleItemsExpanded}
          >
            <Typography variant="h6" fontWeight="bold">
              Order Items ({order.items.length})
            </Typography>
            <IconButton size="small">
              {itemsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          <Collapse in={itemsExpanded} timeout="auto">
            <Box sx={styles.infoSection}>
              {order.items.length === 0 ? (
                <Typography color="text.secondary" textAlign="center" py={4}>
                  No items in this order
                </Typography>
              ) : (
                <TableContainer sx={styles.tableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell>
                            <Box sx={styles.productBox}>
                              {item.image || (item.product && item.product.image) ? (
                                <Box 
                                  onClick={() => item.product?.id && handleProductClick(item.product.id)}
                                  sx={styles.productBox}
                                >
                                  <CardMedia
                                    component="img"
                                    image={item.image || (item.product && item.product.image) || 'https://via.placeholder.com/80x80?text=Product'}
                                    alt={item.name || (item.product && item.product.name) || 'Product'}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const url = item.image || (item.product && item.product.image) || 'https://via.placeholder.com/800x800?text=Product';
                                      const name = item.name || (item.product && item.product.name) || 'Product';
                                      handleImageClick(e, url, name);
                                    }}
                                    sx={styles.productImage}
                                  />
                                </Box>
                              ) : (
                                <Avatar 
                                  variant="rounded" 
                                  sx={styles.avatarStyle(theme)}
                                >
                                  <ProductIcon />
                                </Avatar>
                              )}
                              <Typography 
                                variant="body2" 
                                fontWeight="medium"
                                onClick={() => item.product?.id && handleProductClick(item.product.id)}
                                sx={styles.productNameStyle}
                              >
                                {item.name || (item.product && item.product.name) || 'Unknown Product'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{formatPrice(item.price)}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={item.quantity} 
                              size="small" 
                              variant="outlined"
                              sx={styles.quantityChip}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontWeight="medium" color="primary.main">
                              {formatPrice(item.price * item.quantity)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Collapse>
        </Paper>
        
        {/* Order Summary Section */}
        <Paper elevation={3} sx={styles.summaryPaper}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={styles.contentDivider} />
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={styles.stackFullWidth}>
            <Box sx={styles.equalWidthBox}>
              <Card variant="outlined" sx={styles.equalHeightCard}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Shipping Address
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress || 'No shipping address provided'}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            
            <Box sx={styles.equalWidthBox}>
              <Card variant="outlined" sx={styles.equalHeightCard}>
                <CardContent>
                  <Box sx={styles.summaryBox}>
                    <Box sx={styles.summaryRow}>
                      <Typography variant="body2">Subtotal:</Typography>
                      <Typography variant="body2">{formatPrice(order.subtotal)}</Typography>
                    </Box>
                    <Box sx={styles.summaryRow}>
                      <Typography variant="body2">GST (18%):</Typography>
                      <Typography variant="body2">{formatPrice(order.tax)}</Typography>
                    </Box>
                    
                    {order.coupon && (
                      <Box sx={styles.summaryRow}>
                        <Typography variant="body2">
                          Discount {order.coupon.discountPercentage && `(${order.coupon.discountPercentage}% off)`}:
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          -{formatPrice(order.discount)}
                        </Typography>
                      </Box>
                    )}
                    
                    <Divider sx={styles.divider} />
                    
                    <Box sx={styles.summaryRow}>
                      <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                        {formatPrice(order.total)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Paper>
        
        {/* Cancel Order Confirmation Dialog */}
        <Dialog
          open={cancelDialogOpen}
          onClose={handleCloseCancelDialog}
          aria-labelledby="cancel-dialog-title"
          aria-describedby="cancel-dialog-description"
          PaperProps={{
            elevation: 8,
            sx: styles.dialogPaper
          }}
        >
          <DialogTitle id="cancel-dialog-title" sx={styles.dialogTitle}>
            <Box sx={styles.cancelledStatusBox}>
              <CancelledIcon color="error" sx={styles.cancelIcon} />
              <Typography variant="h6">Cancel Order?</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="cancel-dialog-description">
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogContentText>
            {cancelError && (
              <Alert severity="error" sx={styles.cancelledAlert}>
                {cancelError}
              </Alert>
            )}
          </DialogContent>
          <DialogActions sx={styles.dialogActions}>
            <Button 
              variant="outlined" 
              onClick={handleCloseCancelDialog} 
              disabled={cancelLoading}
              color="inherit"
            >
              No, Keep Order
            </Button>
            <Button 
              variant="contained" 
              onClick={handleConfirmCancel} 
              color="error" 
              disabled={cancelLoading}
              startIcon={cancelLoading ? <CircularProgress size={16} color="inherit" /> : <CancelledIcon />}
            >
              {cancelLoading ? 'Cancelling...' : 'Yes, Cancel Order'}
            </Button>
          </DialogActions>
        </Dialog>
        
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
      </Box>
    </Fade>
  );
};

export default OrderDetail; 