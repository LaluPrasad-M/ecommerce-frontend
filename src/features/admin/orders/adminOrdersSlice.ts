import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../types';
import api from '../../../api/client';

interface AdminOrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminOrdersState = {
  orders: [],
  loading: false,
  error: null
};

// Fetch all orders
export const fetchAdminOrders = createAsyncThunk(
  'adminOrders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/orders');
      return response.data.orders || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateStatus',
  async ({ orderId, status }: { orderId: string, status: string }, { rejectWithValue }) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      return { orderId, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
    }
  }
);

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch orders cases
    builder.addCase(fetchAdminOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAdminOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update order status cases
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<{ orderId: string, status: string }>) => {
      const { orderId, status } = action.payload;
      state.orders = state.orders.map(order => 
        order.id === orderId ? { ...order, status: status as any } : order
      );
      state.loading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearOrderError } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer; 