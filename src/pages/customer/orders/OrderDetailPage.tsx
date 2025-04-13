import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Skeleton,
  Alert,
  AlertTitle,
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import OrderDetail from '../../../components/customer/order/OrderDetail';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchOrderById, clearSelectedOrder } from '../../../features/customer/orders/ordersSlice';
import { orderDetailPageStyles } from '../../../styles/customer/order/OrderDetailPageStyles';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedOrder: order, loading, error } = useAppSelector(state => state.orders);
  
  useEffect(() => {
    // Always fetch the order data when the component mounts or the ID changes
    if (id) {
      dispatch(fetchOrderById(id));
    }
    
    // Cleanup on component unmount
    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      console.log('Order data loaded:', order);
    }
  }, [order]);

  // Loading state with skeletons for better UX
  if (loading) {
    return (
      <Container sx={orderDetailPageStyles.container}>
        <Box sx={orderDetailPageStyles.backButtonBox}>
          <Skeleton variant="text" width={200} height={40} />
        </Box>
        <Paper elevation={2} sx={orderDetailPageStyles.paperContainer}>
          <Box sx={orderDetailPageStyles.skeletonContainer}>
            <Skeleton variant="text" width={150} height={32} />
            <Skeleton variant="rounded" width={100} height={28} />
          </Box>
          <Box sx={orderDetailPageStyles.contentBox}>
            <Box sx={orderDetailPageStyles.flexBox}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Box>
            <Box sx={orderDetailPageStyles.flexBox}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Box>
          </Box>
        </Paper>
        
        <Paper elevation={2} sx={orderDetailPageStyles.paperContainer}>
          <Skeleton variant="text" width={120} height={32} sx={orderDetailPageStyles.skeletonRow} />
          <Skeleton variant="rectangular" height={100} sx={orderDetailPageStyles.skeletonRow} />
        </Paper>
        
        <Paper elevation={2} sx={orderDetailPageStyles.paperContainer}>
          <Skeleton variant="text" width={120} height={32} sx={orderDetailPageStyles.skeletonRow} />
          <Skeleton variant="rectangular" height={200} />
        </Paper>
      </Container>
    );
  }
  
  // Enhanced error state
  if (error) {
    return (
      <Container sx={orderDetailPageStyles.container}>
        <Alert 
          severity="error" 
          variant="filled"
          sx={orderDetailPageStyles.alertAction}
          action={
            <Button 
              color="inherit" 
              component={Link} 
              to="/orders"
              size="small"
            >
              Back to Orders
            </Button>
          }
        >
          <AlertTitle>Error Loading Order</AlertTitle>
          {error}
        </Alert>
        
        <Paper elevation={2} sx={orderDetailPageStyles.errorPaper}>
          <Typography variant="body1" color="text.secondary" paragraph>
            Unable to load the order details. Please try again later.
          </Typography>
        </Paper>
      </Container>
    );
  }
  
  // Not found state
  if (!order) {
    return (
      <Container sx={orderDetailPageStyles.container}>
        <Alert 
          severity="warning" 
          variant="filled"
          sx={orderDetailPageStyles.alertAction}
          action={
            <Button 
              color="inherit" 
              component={Link} 
              to="/orders"
              size="small"
            >
              Back to Orders
            </Button>
          }
        >
          <AlertTitle>Order Not Found</AlertTitle>
          The requested order could not be found.
        </Alert>
        
        <Paper elevation={2} sx={orderDetailPageStyles.notFoundPaper}>
          <Typography variant="body1" color="text.secondary" paragraph>
            The order you're looking for may have been removed or you may not have permission to view it.
          </Typography>
          <Button 
            variant="contained" 
            component={Link}
            to="/orders"
            startIcon={<ArrowBackIcon />}
            sx={orderDetailPageStyles.actionButton}
          >
            View All Orders
          </Button>
        </Paper>
      </Container>
    );
  }
  
  // Order details successful state
  return (
    <Container sx={orderDetailPageStyles.container}>
      <Box sx={orderDetailPageStyles.headerBox}>
        <Typography variant="h4" component="h1">
          Order Details
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/orders"
          startIcon={<ArrowBackIcon />}
          size="small"
        >
          Back to Orders
        </Button>
      </Box>
      {
        loading ? (
          <Skeleton variant="rectangular" height={1000} />
        ) : (
          <OrderDetail order={order} />
        )
      }
    </Container>
  );
};

export default OrderDetailPage;
