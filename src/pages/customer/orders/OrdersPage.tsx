import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  Stack,
  CircularProgress
} from '@mui/material';
import { ShoppingBag as ShoppingBagIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { fetchOrders } from '../../../features/customer/orders/ordersSlice';
import OrderCard from '../../../components/shared/order/OrderCard';
import { ordersPageStyles } from '../../../styles/customer/order';

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { orders, loading, error } = useAppSelector(state => state.orders);
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Loading state
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={ordersPageStyles.headerBox}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Orders
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
        </Typography>
      </Box>
      
      <Divider sx={ordersPageStyles.divider} />
      
      {orders.length === 0 ? (
        <Paper sx={ordersPageStyles.emptyOrdersPaper}>
          <Typography variant="h6" gutterBottom>
            You haven't placed any orders yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Once you place orders, they will appear here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/products"
            startIcon={<ShoppingBagIcon />}
            size="large"
            sx={ordersPageStyles.browseButton}
          >
            Browse Products
          </Button>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {orders.map((order: any) => (
            <OrderCard key={order.id} order={order} variant="customer" />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default OrdersPage; 