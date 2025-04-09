import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Divider,
  Button,
  Box,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
  Fade
} from '@mui/material';
import { 
  Receipt as ReceiptIcon,
  LocalOffer as CouponIcon,
  ShoppingBag as OrderIcon,
  Clear as ClearIcon,
  ContentPaste as PasteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { applyCoupon, removeCoupon } from '../../../features/customer/cart/cartSlice';
import { placeOrder } from '../../../features/customer/orders/ordersSlice';
import { cartSummaryStyles } from '../../../styles/customer/cart';

const CartSummary: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { subtotal, tax, discount, total, appliedCoupon, items, error: cartError } = useAppSelector(state => state.cart);
  const { loading: orderLoading, error: orderError } = useAppSelector(state => state.orders);
  const { user } = useAppSelector(state => state.auth);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);

  const couponInputRef = useRef<HTMLInputElement>(null);
  
  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value.toUpperCase());
    setCouponError(null);
  };
  
  const handleClearCouponCode = () => {
    setCouponCode('');
    if (couponInputRef.current) {
      couponInputRef.current.focus();
    }
  };

  const handlePasteCouponCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setCouponCode(text.trim().toUpperCase());
      }
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
    }
  };
  
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    try {
      setCouponLoading(true);
      setIsApplying(true);
      await dispatch(applyCoupon(couponCode)).unwrap();
      setCouponCode('');
      setShowCouponSuccess(true);
      setTimeout(() => setShowCouponSuccess(false), 3000);
    } catch (error: any) {
      // Handle structured error response
      if (typeof error === 'object' && error !== null) {
        setCouponError(error.message || 'Failed to apply coupon');
      } else {
        setCouponError(typeof error === 'string' ? error : 'Invalid coupon code');
      }
    } finally {
      setCouponLoading(false);
      setIsApplying(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && couponCode.trim() && !couponLoading) {
      handleApplyCoupon();
    }
  };
  
  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    // Focus the input field after removing coupon
    setTimeout(() => {
      if (couponInputRef.current) {
        couponInputRef.current.focus();
      }
    }, 100);
  };
  
  const handlePlaceOrder = async () => {
    if (items.length === 0 || !user?.address) return;
    
    try {
      await dispatch(placeOrder({ address: user.address })).unwrap();
      navigate('/orders');
    } catch (error: any) {
      console.error('Error placing order', error);
    }
  };

  // Focus coupon input field when component mounts
  useEffect(() => {
    if (!appliedCoupon && couponInputRef.current) {
      couponInputRef.current.focus();
    }
  }, [appliedCoupon]);
  
  const isCouponFieldDisabled = couponLoading || !!appliedCoupon;
  const savingsAmount = discount > 0 ? discount.toFixed(2) : null;
  
  return (
    <Paper elevation={3} sx={cartSummaryStyles.paper}>
      <Typography variant="h6" sx={cartSummaryStyles.title}>
        <ReceiptIcon sx={cartSummaryStyles.receiptIcon} />
        Order Summary
      </Typography>
      
      <Divider sx={cartSummaryStyles.divider} />

      {(cartError || orderError) && (
        <Alert severity="error" sx={cartSummaryStyles.errorAlert}>
          {cartError || orderError}
        </Alert>
      )}
      
      <List disablePadding>
        <ListItem sx={cartSummaryStyles.listItem}>
          <ListItemText primary="Subtotal" />
          <Typography variant="body1" sx={cartSummaryStyles.amountText}>
            ₹{(subtotal || 0).toFixed(2)}
          </Typography>
        </ListItem>
        
        <ListItem sx={cartSummaryStyles.listItem}>
          <ListItemText primary="GST (18%)" />
          <Typography variant="body1" sx={cartSummaryStyles.amountText}>
            ₹{(tax || 0).toFixed(2)}
          </Typography>
        </ListItem>
        
        {(discount || 0) > 0 && (
          <ListItem sx={cartSummaryStyles.listItem}>
            <ListItemText 
              primary="Discount"
              secondary={appliedCoupon ? `Coupon: ${appliedCoupon.code} (${appliedCoupon.discountPercentage}%)` : ''} 
            />
            <Typography variant="body1" color="success.main" sx={cartSummaryStyles.amountText}>
              -₹{(discount || 0).toFixed(2)}
            </Typography>
          </ListItem>
        )}
        
        <Divider sx={cartSummaryStyles.divider} />
        
        <ListItem sx={cartSummaryStyles.listItem}>
          <ListItemText primary={<Typography variant="h6">Total</Typography>} />
          <Typography variant="h6" color="primary.main" sx={cartSummaryStyles.amountText}>
            ₹{(total || 0).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      
      <Divider sx={cartSummaryStyles.divider} />
      
      {appliedCoupon ? (
        <Box sx={cartSummaryStyles.appliedCouponBox}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2">Coupon Applied</Typography>
                <Typography sx={cartSummaryStyles.couponCodeText}>
                  {appliedCoupon?.code}
                </Typography>
                <Typography sx={cartSummaryStyles.couponSavings}>
                  You saved ₹{savingsAmount}<br />({appliedCoupon?.discountPercentage}% off)
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="outlined"
              size="small"
              onClick={handleRemoveCoupon}
              sx={cartSummaryStyles.removeButton}
              aria-label="Remove coupon"
            >
              Remove
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={cartSummaryStyles.couponSection}>
          <Box sx={cartSummaryStyles.couponHeading}>
            <CouponIcon sx={cartSummaryStyles.couponHeadingIcon} />
            <Typography variant="subtitle2">Apply Coupon</Typography>
          </Box>
          
          <Box sx={cartSummaryStyles.couponForm}>
            <Box sx={cartSummaryStyles.couponFieldContainer}>
              <TextField
                inputRef={couponInputRef}
                fullWidth
                size="small"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={handleCouponCodeChange}
                onKeyDown={handleKeyDown}
                error={!!couponError}
                disabled={isCouponFieldDisabled}
                autoComplete="off"
                InputProps={{
                  sx: cartSummaryStyles.couponInput,
                  endAdornment: (
                    <InputAdornment position="end">
                      {couponCode && (
                        <IconButton
                          aria-label="clear coupon code"
                          onClick={handleClearCouponCode}
                          edge="end"
                          size="small"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      )}
                      {!couponCode && (
                        <Tooltip title="Paste from clipboard">
                          <IconButton
                            aria-label="paste coupon code"
                            onClick={handlePasteCouponCode}
                            edge="end"
                            size="small"
                          >
                            <PasteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              {showCouponSuccess && (
                <Fade in={showCouponSuccess}>
                  <Box sx={{ 
                    position: 'absolute', 
                    right: 8, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </Box>
                </Fade>
              )}
            </Box>
            <Button 
              variant="contained" 
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || couponLoading}
              sx={cartSummaryStyles.couponButton}
            >
              {couponLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : isApplying ? (
                'Applying...'
              ) : (
                'Apply'
              )}
            </Button>
          </Box>
          
          {couponError && (
            <Alert severity="error" sx={cartSummaryStyles.couponErrorAlert}>
              {couponError}
            </Alert>
          )}
        </Box>
      )}
      
      <Box sx={cartSummaryStyles.orderButtonContainer}>
        {!user?.address && (
          <Alert severity="warning" sx={cartSummaryStyles.warningAlert}>
            Please add an address in your profile before placing an order.
          </Alert>
        )}
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          size="large"
          disabled={items.length === 0 || !user?.address || orderLoading}
          onClick={handlePlaceOrder}
          startIcon={orderLoading ? <CircularProgress size={20} color="inherit" /> : <OrderIcon />}
          sx={cartSummaryStyles.placeOrderButton}
        >
          {orderLoading ? 'Processing...' : 'Place Order'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CartSummary; 