import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { OrdersState, Order } from '../../../types';
import api from '../../../api/client';

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

// Fetch all orders (customer)
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/customer/orders');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Fetch order by ID (customer)
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/customer/orders/${id}`);
      // Extract order from response, handling both formats (nested or direct)
      return response.data.order || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
  }
);

// Place new order
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData: { address?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.post('/customer/orders', orderData);
      return response.data;
    } catch (error: any) {
      // Handle structured error response with 'message' field
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/customer/orders/${orderId}/cancel`);
      // Extract order from response, handling both formats (nested or direct)
      return response.data.order || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
    }
  }
);

// Admin: Get all orders
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/orders');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all orders');
    }
  }
);

// Admin: Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }: { orderId: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[] | { success: boolean, count: number, orders: Order[] }>) => {
      // Handle both response formats
      if (Array.isArray(action.payload)) {
        state.orders = action.payload;
      } else {
        state.orders = action.payload.orders;
      }
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch order by ID
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Place order
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      state.selectedOrder = action.payload;
      state.loading = false;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false;
      // Handle structured error response
      if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
        state.error = (action.payload as { message: string }).message;
      } else {
        state.error = action.payload as string;
      }
    });
    
    // Cancel order
    builder.addCase(cancelOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      if (state.selectedOrder && state.selectedOrder.id === action.payload.id) {
        state.selectedOrder = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Admin: Fetch all orders
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[] | { success: boolean, count: number, orders: Order[] }>) => {
      // Handle both response formats
      if (Array.isArray(action.payload)) {
        state.orders = action.payload;
      } else {
        state.orders = action.payload.orders;
      }
      state.loading = false;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Admin: Update order status
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      if (state.selectedOrder && state.selectedOrder.id === action.payload.id) {
        state.selectedOrder = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedOrder, clearError } = ordersSlice.actions;
export default ordersSlice.reducer; 