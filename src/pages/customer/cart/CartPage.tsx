import React, { useEffect } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Stack,
  Paper,
  Skeleton,
  Fade
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  ShoppingBag as ShopIcon,
  RemoveShoppingCart as EmptyCartIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import CartItem from '../../../components/customer/cart/CartItem';
import CartSummary from '../../../components/customer/cart/CartSummary';
import { fetchCart } from '../../../features/customer/cart/cartSlice';
import { cartPageStyles } from '../../../styles/customer/cart';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { items, loading } = useAppSelector(state => state.cart);
  
  // Fetch cart data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Show skeleton loading state
  if (loading) {
    return (
      <Container sx={cartPageStyles.container}>
        <Box sx={cartPageStyles.headerBox}>
          <Skeleton variant="text" width={250} height={40} />
          <Skeleton variant="text" width={150} height={24} sx={cartPageStyles.skeletonText} />
        </Box>
        
        <Divider sx={cartPageStyles.divider} />
        
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box sx={cartPageStyles.cartItemsBox}>
            <Stack spacing={2}>
              {[1, 2, 3].map((item) => (
                <Skeleton 
                  key={item} 
                  variant="rectangular" 
                  height={120} 
                  sx={cartPageStyles.cartPaper} 
                />
              ))}
            </Stack>
          </Box>
          
          <Box sx={cartPageStyles.summaryBox}>
            <Skeleton 
              variant="rectangular" 
              height={400} 
              sx={cartPageStyles.cartPaper} 
            />
          </Box>
        </Stack>
      </Container>
    );
  }
  
  return (
    <Fade in={true} timeout={300}>
      <Container sx={cartPageStyles.container}>
        <Box sx={cartPageStyles.headerBox}>
          <Typography variant="h4" component="h1" sx={cartPageStyles.headerTitle}>
            <CartIcon sx={cartPageStyles.cartIcon} />
            Your Shopping Cart
          </Typography>
          <Typography variant="subtitle1" sx={cartPageStyles.headerSubtitle}>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </Typography>
        </Box>
        
        <Divider sx={cartPageStyles.divider} />
        
        {items.length === 0 ? (
          <Paper sx={cartPageStyles.emptyCartPaper}>
            <EmptyCartIcon fontSize="large" color="action" sx={cartPageStyles.emptyCartIcon} />
            <Typography variant="h6" gutterBottom sx={cartPageStyles.emptyCartTitle}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={cartPageStyles.emptyCartText}>
              Looks like you haven't added any products to your cart yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/products"
              startIcon={<ShopIcon />}
              size="large"
              sx={cartPageStyles.browseButton}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <Box sx={cartPageStyles.itemsContainer}>
            {/* Cart Items */}
            <Box sx={cartPageStyles.cartItemsBox}>
              <Stack spacing={2}>
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </Stack>
              
              <Box sx={cartPageStyles.cartActionsBox}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/products"
                  startIcon={<ShopIcon />}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Box>
            
            {/* Cart Summary */}
            <Box sx={cartPageStyles.summaryBox}>
              <CartSummary />
            </Box>
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default CartPage; 