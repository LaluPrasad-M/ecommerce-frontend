import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from '../../../types';
import api from '../../../api/client';

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  total: 0,
  appliedCoupon: null,
  loading: false,
  error: null,
  updatingItemId: null,
};

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customer/cart');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await api.post('/customer/cart', { productId, quantity });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await api.put('/customer/cart', { 
        productId,
        quantity 
      });
      return { ...response.data, productId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart item');
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/customer/cart/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/customer/cart');
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

// Apply coupon
export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode: string, { rejectWithValue }) => {
    try {
      const response = await api.post('/customer/cart/coupon', { code: couponCode });
      return response.data;
    } catch (error: any) {
      // Handle structured error response with 'message' field
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to apply coupon');
    }
  }
);

// Remove coupon
export const removeCoupon = createAsyncThunk(
  'cart/removeCoupon',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/customer/cart/coupon');
      return response.data;
    } catch (error: any) {
      // Handle structured error response with 'message' field
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to remove coupon');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      // Handle response which might have cart nested or at top level
      const responseData = action.payload;
      const cartData = responseData.cart || responseData;
      
      state.items = cartData.items || [];
      state.subtotal = cartData.subtotal || 0;
      state.tax = cartData.tax || 0;
      state.discount = cartData.discount !== undefined ? cartData.discount : 0;
      state.total = cartData.total || 0;
      state.appliedCoupon = cartData.coupon || null; // API uses 'coupon' not 'appliedCoupon'
      state.loading = false;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<{ success: boolean, message: string, cart: CartState }>) => {
      const { cart } = action.payload;
      
      if (cart) {
        state.items = cart.items || [];
        state.subtotal = cart.subtotal || 0;
        state.tax = cart.tax || 0;
        state.discount = cart.discount || 0;
        state.total = cart.total || 0;
        state.appliedCoupon = cart.appliedCoupon || null;
      }
      
      state.loading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateCartItem.pending, (state, action) => {
      state.updatingItemId = action.meta.arg.productId;
      state.error = null;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action: PayloadAction<{ success: boolean, message: string, cart: CartState, productId: string }>) => {
      const { cart } = action.payload;
      
      if (cart) {
        state.items = cart.items || [];
        state.subtotal = cart.subtotal || 0;
        state.tax = cart.tax || 0;
        state.discount = cart.discount || 0;
        state.total = cart.total || 0;
        state.appliedCoupon = cart.appliedCoupon || null;
      }
      
      state.updatingItemId = null;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.updatingItemId = null;
      state.error = action.payload as string;
    });

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<{ success: boolean, message: string, cart: CartState }>) => {
      const { cart } = action.payload;
      
      if (cart) {
        state.items = cart.items || [];
        state.subtotal = cart.subtotal || 0;
        state.tax = cart.tax || 0;
        state.discount = cart.discount || 0;
        state.total = cart.total || 0;
        state.appliedCoupon = cart.appliedCoupon || null;
      }
      
      state.loading = false;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.discount = 0;
      state.total = 0;
      state.appliedCoupon = null;
      state.loading = false;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(applyCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      // Handle response which might have cart nested or at top level
      const responseData = action.payload;
      const cartData = responseData.cart || responseData;
      
      // Update cart state with received data
      state.items = cartData.items || state.items;
      state.subtotal = cartData.subtotal || state.subtotal;
      state.tax = cartData.tax || state.tax;
      
      // Explicitly set discount to the value from API
      state.discount = cartData.discount !== undefined ? cartData.discount : 0;
      state.total = cartData.total || state.total;
      
      // Set appliedCoupon from the coupon field in the response
      state.appliedCoupon = cartData.coupon || null;
      state.loading = false;
    });
    builder.addCase(applyCoupon.rejected, (state, action) => {
      state.loading = false;
      // Handle structured error response
      if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
        state.error = (action.payload as { message: string }).message;
      } else {
        state.error = action.payload as string;
      }
    });

    builder.addCase(removeCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeCoupon.fulfilled, (state, action) => {
      // Handle response which might have cart nested or at top level
      const responseData = action.payload;
      const cartData = responseData.cart || responseData;
      
      // Update cart state with received data
      state.items = cartData.items || state.items;
      state.subtotal = cartData.subtotal || state.subtotal;
      state.tax = cartData.tax || state.tax;
      
      // Ensure discount is explicitly set to the new value or 0
      state.discount = cartData.discount !== undefined ? cartData.discount : 0;
      state.total = cartData.total || state.subtotal + state.tax; // Recalculate total if not provided
      
      // Clear the appliedCoupon
      state.appliedCoupon = null;
      state.loading = false;
    });
    builder.addCase(removeCoupon.rejected, (state, action) => {
      state.loading = false;
      // Handle structured error response
      if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
        state.error = (action.payload as { message: string }).message;
      } else {
        state.error = action.payload as string;
      }
    });
  },
});

export default cartSlice.reducer; 